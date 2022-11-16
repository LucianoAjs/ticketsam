import { VALIDATE_TICKET } from '@/modules/user-seller/constants/validate-ticket.constant';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = VALIDATE_TICKET;

export class ValidateTicketResponseDto {
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
