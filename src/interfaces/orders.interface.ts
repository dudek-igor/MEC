export interface Order {
  _id: string;
  status: string;
  productId: number;
  name: string;
  price: number;
  sold_price: number;
}
