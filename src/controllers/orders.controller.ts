import { Request, Response } from 'express';
import { findAllUserOrdersDto, ConfirmOrderDto } from '@/dtos/orders.dto';
import { Order } from '@interfaces/orders.interface';
import OrderService from '@/services/orders.service';
import { SocketServers } from '@/socket';

class OrdersController {
  public ordersService = new OrderService();

  public getOrderDetails = async (req: Request, res: Response) => {
    const orders: findAllUserOrdersDto[] = req.body;
    const data: Order[] = await this.ordersService.findAllUserOrders(orders);
    res.status(200).json({ success: true, error: false, data });
  };

  public confirmOrder = async (req: Request, res: Response) => {
    const order: ConfirmOrderDto = req.body;
    const data: Order = await this.ordersService.saveUserOrders(order);
    const socketServers: SocketServers = res.app.get('socketServers');
    socketServers.registerUserOrderInHub(data); //@Method do not block event loop
    res.status(200).json({ success: true, error: false, data });
  };
}
export default OrdersController;
