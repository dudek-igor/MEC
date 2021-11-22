import { HttpException } from '@exceptions/HttpException';
import { Order } from '@interfaces/orders.interface';
import { Product } from '@interfaces/products.interface';
import orderModel from '@models/orders.model';
import productModel from '@models/products.model';
import { Types } from 'mongoose';
import { isEmpty } from '@utils/util';
import { findAllUserOrdersDto, ConfirmOrderDto } from '@/dtos/orders.dto';

class OrdersService {
  public order = orderModel;
  public product = productModel;

  public async findAllUserOrders(ordersData: findAllUserOrdersDto): Promise<Order[]> {
    if (isEmpty(ordersData.ordersId)) throw new HttpException(400, 'Bad Request');
    const orders = await this.order.find({ _id: { $in: ordersData.ordersId } });
    return orders;
  }

  public async saveUserOrders(orderData: ConfirmOrderDto): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, 'Bad Request');
    const product: Product = await this.product.findOne({ productId: orderData.productId }).select('name price stock');
    if (isEmpty(product)) throw new HttpException(404, 'Product not found'); //@info One of recruitment task
    if (product.stock < orderData.quantity) throw new HttpException(400, 'Bad Request'); //@info One of recruitment task
    const order = await this.order.create({
      status: 'PENDING',
      productId: orderData.productId,
      name: product.name,
      quantity: orderData.quantity,
      sold_price: product.price,
    });
    return order;
  }

  public async orderRejected(correlationId: string): Promise<void> {
    await this.order.updateOne({ _id: correlationId }, { status: 'REJECTED' });
  }

  public async orderConfirmed(correlationId: string): Promise<Order> {
    if (Types.ObjectId.isValid(correlationId)) {
      const order = await this.order.findOneAndUpdate({ _id: correlationId }, { status: 'CONFIRMED' });
      return order;
    }
  }
}

export default OrdersService;
