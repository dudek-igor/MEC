import WebSocket from 'ws';
import { logger } from '@utils/logger';
import ProductService from '@/services/products.service';

class HubSocket extends WebSocket {
  public socket_uri: string;
  public productService = new ProductService();

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
  async _onmessage(event) {
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      await this.productService.bulkCreateOrUpdateProducts(data);
    } else {
      const { operation, payload } = data;
      switch (operation) {
        case 'product.stock.updated':
          return await this.productService.productStockUpdated(payload);
        case 'product.stock.decreased':
          return await this.productService.productStockDecreased(payload);
        case 'product.stock.decrease.failed':
          return console.log('product.stock.decrease.failed');
        case 'product.stock.decrease':
          return console.log('product.stock.decrease - zamówienie!!!!');
        default:
          return;
      }
    }
  }
  _onerror(event) {
    // logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    logger.error(`Error socket connection in ${this.socket_uri}`);
    this.close();
  }
  _onclose(event) {
    logger.info(`=================================`);
    logger.info(`Socket connection close with ${this.socket_uri}`);
    logger.info(`=================================`);
    // Should be reconnect implementation
  }
}

export default HubSocket;
