import { Router } from 'express';
import ProductsController from '@/controllers/products.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncHandler } from '@/utils/asyncHandler';
import validationMiddleware from '@/middlewares/validation.middleware';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/hot-deals`, asyncHandler(this.productsController.getHotDeals));
    this.router.get(`${this.path}/:id`, validationMiddleware(Number, 'params'), asyncHandler(this.productsController.getProductById));
    this.router.get(`${this.path}`, asyncHandler(this.productsController.getAllProducts));
  }
}

export default ProductsRoute;
