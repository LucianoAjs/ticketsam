import { USER } from '@/modules/user/constants/user';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = USER;

export class UserResponseDto {
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
