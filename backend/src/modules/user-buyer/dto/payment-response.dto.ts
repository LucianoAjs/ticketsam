import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({
    example: 201,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
  })
  status: string;

  @ApiProperty({
    type: String,
  })
  paymentId: string;
}
