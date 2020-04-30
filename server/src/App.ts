import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import api from './api/controllers';
import * as errorHandler from './helpers/errorHandler';
import {specs} from "./swaggerDoc";
import * as http from "http";
import {WebSocketConnection} from "./api/websockets";
import SocketIO from "socket.io";
const swaggerUi = require('swagger-ui-express');
const socketIo = require("socket.io");
const cors = require('cors');



class App {
  public express: express.Application;
  public server: http.Server;
  public web_socket_connection: WebSocketConnection;
   constructor() {
    this.express = express();
    this.express.use('/api-docs',swaggerUi.serve, swaggerUi.setup(specs));
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
    this.initWebSocketServer();
  }

  private setMiddlewares(): void {

    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use('/api', api);
  }

  private catchErrors(): void {

    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }

  private initWebSocketServer() {
    this.server = http.createServer(this.express);
    const IO: SocketIO.Socket = socketIo(this.server);
    this.web_socket_connection = new WebSocketConnection(IO);
    this.web_socket_connection.initWebSocketConnection();
  }
}


export default new App();
