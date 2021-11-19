import { Request, Response } from 'express';
import { Product } from '@interfaces/products.interface';
import ProductService from '@services/products.service';

class ProductsController {
  public productsService = new ProductService();

  public getAllProducts = async (req: Request, res: Response) => {
    const data: Product[] = await this.productsService.getAllProducts();
    res.status(200).json({ success: true, error: false, data });
  };

  public getProductById = async (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.id);
    const data: Product = await this.productsService.findProductById(productId);
    res.status(200).json({ success: true, error: false, data });
  };

  public getHotDeals = async (req: Request, res: Response) => {
    const data: Product[] = await this.productsService.findHotDeals();
    res.status(200).json({ success: true, error: false, data });
  };
}

export default ProductsController;
