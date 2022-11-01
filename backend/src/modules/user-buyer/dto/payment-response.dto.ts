import { PAYMENT } from '@/modules/user-buyer/cosntants/payment.constant';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = PAYMENT;

export class PaymentResponseDto {
  @ApiProperty({
    example: 201,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    description: SUCCESS_OPERATION.DESC,
    example: SUCCESS_OPERATION.VALUE,
    type: String,
  })
  description: string;
}
