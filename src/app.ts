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
import { SocketServers } from '@socket';
import { Routes } from '@/interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import http, { Server as HTTPServer } from 'http';

class AppServer {
  public app: express.Application;
  public server: HTTPServer;
  public port: string | number;
  public env: string;
  public socketServers: SocketServers;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.createServer();
    this.connectToDatabase();
    this.createSocketServer();
    this.initializeMiddlewares();
    this.serveReactApp();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.serveReactAppForUnknowPaths();
  }
  //@info getter for app instance
  get getApp() {
    return this.app;
  }
  //@info getter for server instance
  get getServer() {
    return this.server;
  }
  //@info Mount Server Listen
  public listen() {
    this.server.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 Server listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
  //@info Create HTTP Server
  private createServer() {
    this.server = http.createServer(this.app);
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
    this.socketServers = new SocketServers(this.server);
    //@info Populate sockets instances
    this.app.set('socketServers', this.socketServers);
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
  private serveReactApp() {
    this.app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
  }
  //@info Serve React App for any unknown paths
  private serveReactAppForUnknowPaths() {
    this.app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
    });
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

export default AppServer;
