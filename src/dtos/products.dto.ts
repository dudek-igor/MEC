import { IsNumber } from 'class-validator';

export class UpdateProductStockDto {
  @IsNumber()
  public productId: number;

  @IsNumber()
  public stock: number;
}
