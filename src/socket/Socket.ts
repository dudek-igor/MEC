import WebSocket, { WebSocketServer } from 'ws';
import ProductService from '@/services/products.service';
import { logger } from '@utils/logger';

class SocketServer {
  public server: WebSocketServer;
  public hub_client: WebSocket;
  public productService = new ProductService();

  constructor() {
    this.server = new WebSocketServer({ port: 8080 });
    this.mountServerListeners();
    this.hub_client = new WebSocket('wss://mec-storage.herokuapp.com');
    this.mountHubListeners();
  }

  mountServerListeners() {
    this.server.on('connection', ws => {
      logger.info(`=================================`);
      logger.info(`New Socket Client Connected`);
      logger.info(`=================================`);
      ws.on('message', data => {
        console.log('jestem w message ');
        console.log('received: %s', data);
      });
      ws.on('open', () => {
        console.log('jestem w on open ');
        ws.send('something');
      });
      //   ws.send('Connection');
      //@warning Cannot subscribe for events from diffrent socket!
    });
  }

  mountHubListeners() {
    this.hub_client.on('open', () => {
      logger.info(`=================================`);
      logger.info(`Establish socket connection with ${'wss://mec-storage.herokuapp.com'}`);
      logger.info(`=================================`);
    });

    this.hub_client.on('message', async message => {
      const data = JSON.parse(message.toString());
      if (Array.isArray(data)) {
        await this.productService.bulkCreateOrUpdateProducts(data);
      } else {
        const { operation, payload } = data;
        switch (operation) {
          case 'product.stock.updated':
            await this.productService.productStockUpdated(payload);
            break;
          case 'product.stock.decreased':
            await this.productService.productStockDecreased(payload);
            break;
          case 'product.stock.decrease.failed':
            console.log('product.stock.decrease.failed');
            break;
          case 'product.stock.decrease':
            console.log('product.stock.decrease - zamówienie!!!!');
            break;
          default:
            break;
        }
        //@info Broadcast event from Hub Socket to client
        this.server.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
          }
        });
      }
    });
  }
}

export default SocketServer;
