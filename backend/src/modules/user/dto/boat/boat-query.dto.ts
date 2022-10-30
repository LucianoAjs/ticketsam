import { CREATE_TICKET } from '@/modules/user/constants/create-ticket.contant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const {
  API_QUERY: { BOAT_ID },
} = CREATE_TICKET;

export class BoatQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: BOAT_ID.DESC,
    example: BOAT_ID.VALUE,
    type: String,
  })
  boatId: string;
}
