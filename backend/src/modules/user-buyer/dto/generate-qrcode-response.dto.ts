import { GENERATE_QRCODE } from '@/modules/user-buyer/constants/generate-qrcode.constant';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_PROPERTY: { URL },
} = GENERATE_QRCODE;

export class GenerateQRcodeResponseDto {
  @ApiProperty({
    description: URL.DESC,
    example: URL.VALUE,
    type: String,
  })
  qrcode: string;
}
