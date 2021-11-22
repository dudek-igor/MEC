import { Router } from 'express';
import OrdersController from '@/controllers/orders.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncHandler } from '@/utils/asyncHandler';
import validationMiddleware from '@/middlewares/validation.middleware';
import { findAllUserOrdersDto, ConfirmOrderDto } from '@/dtos/orders.dto';

class OrdersRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/confirm`, validationMiddleware(ConfirmOrderDto, 'body'), asyncHandler(this.ordersController.confirmOrder));
    this.router.post(`${this.path}`, validationMiddleware(findAllUserOrdersDto, 'body'), asyncHandler(this.ordersController.getOrdersDetails));
  }
}

export default OrdersRoute;
