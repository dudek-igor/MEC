import WebSocket, { WebSocketServer } from 'ws';
import ProductService from '@/services/products.service';
import OrdersService from '@/services/orders.service';
import { logger } from '@utils/logger';
import { Order } from '@interfaces/orders.interface';
import { SocketData } from '@interfaces/socket.interface';
import { Product } from '@interfaces/products.interface';

class SocketServers {
  public server: WebSocketServer;
  public hubClient: WebSocket;
  public productService = new ProductService();
  public orderService = new OrdersService();

  constructor() {
    this.server = new WebSocketServer({ port: 8080 });
    this.mountServerListeners();
    this.hubClient = new WebSocket('wss://mec-storage.herokuapp.com');
    this.mountHubListeners();
  }
  //@info Mount Server Listeners
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
  //@info Mount Hub Connection Listeners
  mountHubListeners() {
    this.hubClient.on('open', () => {
      logger.info(`=================================`);
      logger.info(`Establish socket connection with ${'wss://mec-storage.herokuapp.com'}`);
      logger.info(`=================================`);
    });

    this.hubClient.on('message', async message => {
      const data: SocketData | Product[] = JSON.parse(message.toString());
      if (Array.isArray(data)) {
        await this.productService.bulkCreateOrUpdateProducts(data);
      } else {
        const { operation, correlationId, payload } = data;
        switch (operation) {
          case 'product.stock.updated':
            await this.productService.productStockUpdated(payload);
            break;
          case 'product.stock.decreased':
            const order = await this.orderService.orderConfirmed(correlationId);
            if (order) {
              await this.productService.productStockDecreased({ productId: order.productId, ...payload });
            } else {
              await this.productService.productStockDecreased(payload);
            }
            break;
          case 'product.stock.decrease.failed':
            await this.orderService.orderRejected(correlationId);
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
  //@info Method for register order in hub
  registerUserOrderInHub(orderData: Order) {
    //@info Do not block event loop
    process.nextTick(() => {
      this.hubClient.send(
        Buffer.from(
          JSON.stringify({
            operation: 'product.stock.decrease',
            correlationId: orderData._id, // tutaj powinno znaleźć się wygenerowane przez Ciebie unikalne id
            payload: {
              productId: orderData.productId, // id produktu
              stock: orderData.quantity, // ile sztuk zostało zamówionych
            },
          }),
        ),
      );
    });
  }
}

export default SocketServers;
