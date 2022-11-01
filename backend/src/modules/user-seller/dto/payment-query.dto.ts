import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaymentQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
  })
  paymentId: string;
}
