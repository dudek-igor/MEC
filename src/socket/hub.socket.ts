import WebSocket from 'ws';
import { logger } from '@utils/logger';

class HubSocket extends WebSocket {
  public socket_uri: string;
  constructor(socket_uri) {
    super(socket_uri);
    this.socket_uri = socket_uri;
    this.onopen = this._onopen;
    this.onmessage = this._onmessage;
    this.onerror = this._onerror;
    this.onclose = this._onclose;
  }
  _onopen() {
    logger.info(`=================================`);
    logger.info(`Establish socket connection with ${this.socket_uri}`);
    logger.info(`=================================`);
  }
  _onmessage(event) {
    console.log('Connection message event:');
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      console.log(data);
      // Bulk Insert / Update
    } else {
      const { operation, payload } = data;
      console.log(operation);

      switch (operation) {
        case 'product.stock.updated':
          return console.log('product.stock.updated');
        case 'product.stock.decreased':
          return console.log('product.stock.decreased');
        case 'product.stock.decrease.failed':
          return console.log('product.stock.decrease.failed');
        case 'product.stock.decrease':
          return console.log('product.stock.decrease');
        default:
          return;
      }
    }
  }
  _onerror(event) {
    console.log(event);
    // logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    logger.error(`Error socket connection in ${this.socket_uri}`);
  }
  _onclose() {
    logger.info(`=================================`);
    logger.info(`Socket connection close with ${this.socket_uri}`);
    logger.info(`=================================`);
  }
}

export default HubSocket;
