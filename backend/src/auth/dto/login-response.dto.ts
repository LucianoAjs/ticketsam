import { AUTH } from '@/auth/constants/auth.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const {
  API_RESPONSE: { SUCCESS_OPERATION },
} = AUTH;

export class LoginResponseDto {
  @IsString()
  @ApiProperty({
    description: SUCCESS_OPERATION.DESC,
    example: SUCCESS_OPERATION.VALUE,
    type: String,
  })
  access_token: string;
}
