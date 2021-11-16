process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import { io, Socket } from 'socket.io-client';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public socket_connection_hub: Socket;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.connectToDatabase();
    this.connectToHubViaSocket();
    this.initializeMiddlewares();
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
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
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
  //@info Connect with Hub via socket
  private connectToHubViaSocket() {
    this.socket_connection_hub = io(config.get('socket.mec_uri'), {
      // transports: ['websocket'],
      // transports: ['websocket'], config: [.connectParams(["EIO": "3"])],
      // maxHttpBufferSize: 1e8,
      // transports: ['websocket'],
      // transports: ['websocket', 'polling'],
      // reconnection: true,
      // rejectUnauthorized: false,
      // path: '/socket.io/',
      // upgrade: true,
      // rememberUpgrade: true,
      // withCredentials: true,
      // rejectUnauthorized: true,
      // withCredentials: true,
      // port: '80',
      // extraHeaders: {
      //   // Connection: 'Upgrade',
      //   // 'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
      //   // 'Sec-WebSocket-Version': '13',
      //   Upgrade: 'websocket',
    });
    this.socket_connection_hub
      .on('connect', () => {
        console.log('Socket connected');
        // console.log(this.socket_hub.connected); // true
      })
      .on('disconnect', () => {
        console.log('Socket diconnected');
        // console.log(this.socket_hub.connected); // false
      })
      .on('error', () => {
        console.log('Socket diconnected');
      })
      .on('connect_error', error => {
        console.log('Connection Socket Error');
        console.log(error);
        // socket.connect();
      });
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
  //@info Mount Routes
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }
  //@info Init Swagger
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'MEC docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
  //@info Init Error Handler Middleware
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
