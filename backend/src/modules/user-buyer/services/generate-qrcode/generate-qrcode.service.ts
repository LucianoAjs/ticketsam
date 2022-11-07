import { UsersLoggerService } from '@/logger/logger.service';
import { GenerateQRcodeResponseDto } from '@/modules/user-buyer/dto/generate-qrcode-response.dto';
import { GenerateQRcodeDto } from '@/modules/user-buyer/dto/generate-qrcode.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
const QRCode = require('qrcode');

@Injectable()
export class GenerateQRcodeService {
  constructor(private readonly usersLogger: UsersLoggerService) {}

  async generateQrcode(
    body: GenerateQRcodeDto,
  ): Promise<GenerateQRcodeResponseDto> {
    const { url } = body;
    let qrcode;

    try {
      const dataQrcode = await QRCode.toDataURL(url);
      qrcode = Buffer.from(dataQrcode).toString('base64');
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }

    return { qrcode };
  }
}
