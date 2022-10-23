import { USER } from '@/modules/user/constants/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const {
  API_PROPERTY: {
    USER: { EMAIL, PASSWORD },
  },
} = USER;

export class LoginRequestDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: EMAIL.DESC,
    example: EMAIL.VALUE,
    pattern: '^[^@s]+@[`@s]+.[`@s]+$',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: PASSWORD.DESC,
    example: PASSWORD.VALUE,
    type: String,
  })
  password: string;
}
