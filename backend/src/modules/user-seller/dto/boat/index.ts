import { VALIDATE_BOAT } from '@/modules/user-seller/constants/boat';
import { BoatDto } from '@/modules/user-seller/dto/boat/nested/boat.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

const {
  API_PROPERTY: { CNPJ },
} = VALIDATE_BOAT;

export class ValidateBoatDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: CNPJ.DESC,
    example: CNPJ.VALUE,
    pattern: '^[0-9]{2}.?[0-9]{3}.?[0-9]{3}/?[0-9]{4}-?[0-9]{2}$',
    type: String,
  })
  cnpj: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: BoatDto,
  })
  boat: BoatDto;
}
