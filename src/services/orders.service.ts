import { HttpException } from '@exceptions/HttpException';
import { Order } from '@interfaces/orders.interface';
import { Product } from '@interfaces/products.interface';
import orderModel from '@models/orders.model';
import productModel from '@models/products.model';
import { isEmpty } from '@utils/util';

class OrdersService {
  public order = orderModel;
  public product = productModel;

  public async findAllUserOrders(ordersId): Promise<Order[]> {
    const orders = await this.order.find({ _id: { $nin: ordersId.map(({ orderId }) => orderId) } });
    return orders;
  }

  public async saveUserOrders(order): Promise<Order> {
    if (isEmpty(order)) throw new HttpException(400, 'Bad Request');
    const product: Product = await this.product.findOne({ productId: order.productId }).select('name price stock');
    console.log(product);
    if (isEmpty(product)) throw new HttpException(404, 'Product not found'); //@info One of recruitment task
    if (product.stock < order.quantity) throw new HttpException(400, 'Bad Request'); //@info One of recruitment task
    const orders = await this.order.create({
      status: 'PENDING',
      productId: order.productId,
      name: product.name,
      quantity: order.quantity,
      sold_price: product.price,
    });
    return orders;
  }
}

export default OrdersService;
