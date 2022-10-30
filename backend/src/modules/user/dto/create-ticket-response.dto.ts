import { BoatDto } from '@/modules/user/dto/boat/nested/boat.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class CreateTicketResponseDto {
  @ApiProperty({
    type: CreateTicketDto,
  })
  ticket: BoatDto;
}
