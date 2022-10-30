import { BoatDto } from '@/modules/user-seller/dto/boat/nested/boat.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class CreateTicketResponseDto {
  @ApiProperty({
    type: CreateTicketDto,
  })
  ticket: BoatDto;
}
