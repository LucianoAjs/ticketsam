import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GET_TICKET_BY_ID } from '../constants/get-ticket-by-id.constant';

const {
  API_PROPERTY_PARAM: { TICKET_ID },
} = GET_TICKET_BY_ID;

export class GetTicketParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: TICKET_ID.DESC,
    example: TICKET_ID.VALUE,
    type: String,
  })
  ticketId?: string;
}
