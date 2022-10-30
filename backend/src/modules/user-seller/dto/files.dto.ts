import { DOCUMENT } from '@/modules/user-seller/constants/document.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import 'multer';

const { BACK, FRONT, SELFIE } = DOCUMENT;

export class FilesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: BACK.DESC,
    example: BACK.VALUE,
    type: String,
    format: 'binary',
  })
  documentBack: Express.Multer.File[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: FRONT.DESC,
    example: FRONT.VALUE,
    type: String,
    format: 'binary',
  })
  documentFront: Express.Multer.File[];

  @ApiProperty({
    description: SELFIE.DESC,
    example: SELFIE.VALUE,
    type: String,
    format: 'binary',
  })
  selfie: Express.Multer.File[];
}
