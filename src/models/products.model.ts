import { model, Schema, Document } from 'mongoose';
import { Product } from '@/interfaces/products.interface';

const productSchema: Schema = new Schema({
  productId: {
    type: Number,
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
});

const articleModel = model<Product & Document>('Product', productSchema);

export default articleModel;
