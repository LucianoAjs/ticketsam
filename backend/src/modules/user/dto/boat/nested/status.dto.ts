import { GET_BOAT_STATUS } from '@/modules/user/constants/boat/get-boat-status.constant';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_PROPERTY: { STATUS },
} = GET_BOAT_STATUS;

export class StatusDto {
  @ApiProperty({
    description: STATUS.DESC,
    example: STATUS.VALUE,
    type: String,
  })
  status: string;
}
