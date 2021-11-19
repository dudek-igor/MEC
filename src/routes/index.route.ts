import { Router } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import IndexController from '@controllers/index.controller';
import { Routes } from '@/interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, asyncHandler(this.indexController.index));
  }
}

export default IndexRoute;
