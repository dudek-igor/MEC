import { NextFunction, Request, Response } from 'express';
import { findAllUserOrdersDto, ConfirmOrderDto } from '@/dtos/orders.dto';
import { Order } from '@interfaces/orders.interface';
import OrderService from '@/services/orders.service';

class OrdersController {
  public ordersService = new OrderService();

  public getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: findAllUserOrdersDto[] = req.body;
      const data: Order[] = await this.ordersService.findAllUserOrders(orders);
      res.status(200).json({ success: true, error: false, data });
    } catch (error) {
      next(error);
    }
  };

  public confirmOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order: ConfirmOrderDto = req.body;
      const data: Order = await this.ordersService.saveUserOrders(order);
      res.status(200).json({ success: true, error: false, data });
    } catch (error) {
      next(error);
    }
  };
}
export default OrdersController;
