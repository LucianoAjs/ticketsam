import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import 'multer';

export class DocumentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
  })
  DocumentBackUri: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
  })
  DocumentFrontUri: string;

  @ApiProperty({
    type: String,
  })
  DocumentSelfieUri: string;
}
