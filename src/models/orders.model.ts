import { model, Schema, Document } from 'mongoose';
import { Order } from '@interfaces/orders.interface';

const orderSchema: Schema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold_price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const orderModel = model<Order & Document>('Order', orderSchema);

export default orderModel;
