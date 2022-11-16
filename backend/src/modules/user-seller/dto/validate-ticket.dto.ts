import { VALIDATE_TICKET } from '@/modules/user-seller/constants/validate-ticket.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const {
  API_PROPERTY: { PAYMENT_ID, TICKET_ID },
} = VALIDATE_TICKET;

export class ValidateTicketDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: TICKET_ID.DESC,
    example: TICKET_ID.VALUE,
    type: String,
  })
  ticketId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: PAYMENT_ID.DESC,
    example: PAYMENT_ID.VALUE,
    type: String,
  })
  paymentId: string;
}
