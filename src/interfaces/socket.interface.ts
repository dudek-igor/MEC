export interface SocketData {
  operation: string;
  payload: SocketPayload;
  correlationId: string;
}

export interface SocketPayload {
  stock: number;
  productId?: number;
}
