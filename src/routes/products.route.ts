import { Router } from 'express';
import ProductsController from '@/controllers/products.controller';
import { Routes } from '@/interfaces/routes.interface';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getAllProducts);
    this.router.get(`${this.path}/:id`, this.productsController.getProductById);
  }
}

export default ProductsRoute;
