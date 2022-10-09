import { USER } from '@/modules/user/constants/user.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = USER;

export class UserResponseDto {
  @IsNumber()
  @ApiProperty({
    example: 201,
    type: Number,
  })
  statusCode: number;

  @IsString()
  @ApiProperty({
    description: SUCCESS_OPERATION.DESC,
    example: SUCCESS_OPERATION.VALUE,
    type: String,
  })
  description: string;
}
