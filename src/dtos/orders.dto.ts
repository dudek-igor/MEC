import { IsNumber, IsString, IsArray } from 'class-validator';

export class findAllUserOrdersDto {
  @IsArray()
  @IsString({ each: true })
  ordersId: string[];
}

export class ConfirmOrderDto {
  @IsNumber()
  public productId: number;
  @IsNumber()
  public quantity: number;
}
