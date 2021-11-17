import { Router } from 'express';
import OrdersController from '@/controllers/orders.controller';
import { Routes } from '@/interfaces/routes.interface';

class OrdersRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ordersController.getOrderDetails);
    this.router.post(`${this.path}`, this.ordersController.confirmOrder);
  }
}

export default OrdersRoute;
