import { VALIDATE_BOAT } from '@/modules/user/constants/boat';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

const {
  API_PROPERTY: {
    BOAT: { IMO, FLAG, NAME, SUBSCRIPTION },
  },
} = VALIDATE_BOAT;
export class BoatDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: IMO.DESC,
    example: IMO.VALUE,
    type: Number,
  })
  IMO: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: NAME.DESC,
    example: NAME.VALUE,
    type: String,
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: SUBSCRIPTION.DESC,
    example: SUBSCRIPTION.VALUE,
    type: Number,
  })
  subscription: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: FLAG.DESC,
    example: FLAG.VALUE,
    type: String,
  })
  flag: string;
}
