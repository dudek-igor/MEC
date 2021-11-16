import { model, Schema, Document } from 'mongoose';
import { Product } from '@/interfaces/products.interface';

const productSchema: Schema = new Schema(
  {
    _id: false,
    productId: {
      type: Number,
      primaryKey: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold_times: {
      type: Number,
      default: 0,
      // required: true,
    },
  },
  {
    versionKey: false,
  },
);

const articleModel = model<Product & Document>('Product', productSchema);

export default articleModel;
