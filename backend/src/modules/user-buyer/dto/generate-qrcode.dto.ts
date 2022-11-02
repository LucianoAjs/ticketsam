import { GENERATE_QRCODE } from '@/modules/user-buyer/cosntants/generate-qrcode.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const {
  API_PROPERTY: { URL },
} = GENERATE_QRCODE;

export class GenerateQRcodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: URL.DESC,
    example: URL.VALUE,
    type: String,
  })
  url: string;
}
