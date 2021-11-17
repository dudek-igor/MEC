import { UpdateProductStockDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/products.model';
import { isEmpty } from '@utils/util';

class ProductService {
  public product = productModel;

  public async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.product.find().select('-_id -sold_times');
    return products;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'Product not found');
    const productDetails: Product = await this.product.findOne({ productId }).select('-_id -sold_times');
    if (!productDetails) throw new HttpException(400, 'Product not found');
    return productDetails;
  }

  public async findHotDeals(): Promise<Product[]> {
    const products: Product[] = await this.product.find().sort({ sold_times: 1 }).limit(4).select('-_id -sold_times');
    return products;
  }

  public async bulkCreateOrUpdateProducts(products: Product[]): Promise<void> {
    //@info Two version of logical strategies
    // 1. Insert many then delete old documents
    await this.product.insertMany(products);
    await this.product.deleteMany({
      productId: { $nin: products.map(({ productId }) => productId) },
    });
    // 2. Bulk Create Or Update
    // await this.product.bulkWrite(
    //   products.map(({ productId, name, price, stock }) => ({
    //     updateOne: {
    //       filter: { productId },
    //       update: {
    //         $set: {
    //           /* properties to update */
    //           name,
    //           price,
    //           stock,
    //         },
    //       },
    //       upsert: true, // <<==== upsert in every document
    //     },
    //   })),
    // );
  }

  public async productStockUpdated(product: UpdateProductStockDto): Promise<void> {
    await this.product.updateOne({ productId: product.productId }, { stock: product.stock }); // Stock after inventory
    // await this.product.updateOne({ productId }, { $inc: { stock } }); // Or if i should increase stock after inventory
  }

  public async productStockDecreased(product: UpdateProductStockDto): Promise<void> {
    await this.product.updateOne({ productId: product.productId }, { stock: product.stock, $inc: { sold_times: 1 } });
  }
}

export default ProductService;
