import { CREATE_PREFERENCE } from '@/modules/user-buyer/constants/create-preference.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

const { API_PROPERTY } = CREATE_PREFERENCE;

export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: API_PROPERTY.TITLE.DESC,
    example: API_PROPERTY.TITLE.VALUE,
    type: String,
  })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: API_PROPERTY.UNIT_PRICE.DESC,
    example: API_PROPERTY.UNIT_PRICE.VALUE,
    type: Number,
  })
  unit_price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: API_PROPERTY.QUANTITY.DESC,
    example: API_PROPERTY.QUANTITY.VALUE,
    type: Number,
  })
  quantity: number;
}
