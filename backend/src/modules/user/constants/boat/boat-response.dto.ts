import { ApiProperty } from '@nestjs/swagger';
import { VALIDATE_BOAT } from '.';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = VALIDATE_BOAT;

export class BoatResponseDto {
  @ApiProperty({
    description: SUCCESS_OPERATION.DESC,
    example: SUCCESS_OPERATION.VALUE,
    type: String,
  })
  status: string;
}
