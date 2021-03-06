import WebSocket, { WebSocketServer } from 'ws';
import config from 'config';
import ProductService from '@/services/products.service';
import OrdersService from '@/services/orders.service';
import { logger } from '@utils/logger';
import { Order } from '@interfaces/orders.interface';
import { SocketData } from '@interfaces/socket.interface';
import { Product } from '@interfaces/products.interface';
import { Server as HTTPServer } from 'http';

class SocketServers {
  public webSocketServer: WebSocketServer;
  public hubClient: WebSocket;
  public hubClinetURI: string;
  public productService = new ProductService();
  public orderService = new OrdersService();

  constructor(server: HTTPServer) {
    this.webSocketServer = new WebSocketServer({ server });
    this.mountServerListeners();
    this.hubClinetURI = config.get('socket.mec_uri');
    this.hubClient = new WebSocket(this.hubClinetURI);
    this.mountHubListeners();
  }
  //@info Mount Server Listeners
  private mountServerListeners() {
    this.webSocketServer.on('connection', () => {
      logger.info(`=================================`);
      logger.info(`New Socket Client Connected`);
      logger.info(`=================================`);
      //@info Should be handled in normal
      // ws.on('message', data => {
      //   console.log('received: %s', data);
      // });
      // ws.on('open', () => {
      //   ws.send('something');
      // });
      // ws.send('Connection');
      // ws.on('error', error => {
      //   console.log(error);
      // });
      //@warning Cannot subscribe for events from diffrent socket!
    });
  }
  //@info Mount Hub Connection Listeners
  private mountHubListeners() {
    this.hubClient.on('open', () => {
      logger.info(`=================================`);
      logger.info(`Establish socket connection with ${this.hubClinetURI}`);
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
        this.webSocketServer.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
          }
        });
      }
    });
  }
  //@info Method for register order in hub
  public registerUserOrderInHub(orderData: Order) {
    //@info Do not block event loop
    process.nextTick(() => {
      this.hubClient.send(
        Buffer.from(
          JSON.stringify({
            operation: 'product.stock.decrease',
            correlationId: orderData._id, // tutaj powinno znale???? si?? wygenerowane przez Ciebie unikalne id
            payload: {
              productId: orderData.productId, // id produktu
              stock: orderData.quantity, // ile sztuk zosta??o zam??wionych
            },
          }),
        ),
      );
    });
  }
}

export default SocketServers;
