import { IsNumber, IsString } from 'class-validator';

export class findAllUserOrdersDto {
  @IsString()
  public orderId: string;
}

export class ConfirmOrderDto {
  @IsNumber()
  public productId: string;
  public quantity: number;
}
