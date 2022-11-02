import { CREATE_PREFERENCE } from '@/modules/user-buyer/cosntants/create-preference.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const {
  API_PROPERTY_QUERY: { PAYMENT_ID },
} = CREATE_PREFERENCE;

export class CreatePreferenceQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: PAYMENT_ID.DESC,
    example: PAYMENT_ID.VALUE,
    type: String,
  })
  ticketId: string;
}
