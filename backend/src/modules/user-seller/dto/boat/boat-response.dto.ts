import { VALIDATE_BOAT } from '@/modules/user-seller/constants/boat';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_PROPERTY: {
    BOAT: { IMO, FLAG, NAME, SUBSCRIPTION },
  },
} = VALIDATE_BOAT;

export class BoatResponseDto {
  @ApiProperty({
    description: IMO.DESC,
    example: IMO.VALUE,
    type: Number,
  })
  IMO: number;

  @ApiProperty({
    description: NAME.DESC,
    example: NAME.VALUE,
    type: String,
  })
  name: string;

  @ApiProperty({
    description: SUBSCRIPTION.DESC,
    example: SUBSCRIPTION.VALUE,
    type: Number,
  })
  subscription: number;

  @ApiProperty({
    description: FLAG.DESC,
    example: FLAG.VALUE,
    type: String,
  })
  flag: string;

  @ApiProperty({
    type: String,
  })
  status: string;
}
