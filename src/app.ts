process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { SocketServer, HubSocket } from '@socket';
import { Routes } from '@/interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import WebSocket, { WebSocketServer } from 'ws';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public socket_server: WebSocketServer;
  public ws_hub: WebSocket;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.connectToDatabase();
    this.createSocketServer();
    this.establishSocketConnetions();
    this.initializeMiddlewares();
    this.serverReactApp();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }
  //@info getter for server instance
  public getServer() {
    return this.app;
  }
  //@info Mount App Listen
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
  //@info Connect with DB
  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options);
  }
  //@info Create Socket Server
  private createSocketServer() {
    this.socket_server = new SocketServer(config.get('socket.server_port'));
  }

  //@info Establish Socket Connection
  private establishSocketConnetions() {
    const { mec_uri } = config.get('socket');
    this.ws_hub = new HubSocket(mec_uri);
  }

  //@info Init middlewares before routes
  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
  //@info Serve React App
  private serverReactApp() {
    //@info Serve React App
    this.app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
  }

  //@info Mount Routes
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }
  //@info Init Swagger
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'MEC API',
          version: '1.0.0',
          description: 'MEC docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
  //@info Init Error Handler Middleware
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
