export interface Order {
  _id: string;
  status: string;
  productId: number;
  name: string;
  quantity: number;
  sold_price: number;
}
