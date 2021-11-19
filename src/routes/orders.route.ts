import { Router } from 'express';
import OrdersController from '@/controllers/orders.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncHandler } from '@/utils/asyncHandler';

class OrdersRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/confirm`, asyncHandler(this.ordersController.confirmOrder));
    this.router.post(`${this.path}`, asyncHandler(this.ordersController.getOrderDetails));
  }
}

export default OrdersRoute;
