import { BoatDto } from '@/modules/user-seller/dto/boat/nested/boat.dto';
import { StatusDto } from '@/modules/user-seller/dto/boat/nested/status.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTicketDto } from '../create-ticket.dto';

export class BoatResponseDto {
  @ApiProperty({
    type: BoatDto,
  })
  boat: BoatDto;

  @ApiProperty({
    type: StatusDto,
  })
  status: StatusDto;

  @ApiProperty({
    type: CreateTicketDto,
    isArray: true,
  })
  ticket: CreateTicketDto;
}
