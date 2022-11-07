import { CREATE_PREFERENCE } from '@/modules/user-buyer/constants/create-preference.constant';
import { ApiProperty } from '@nestjs/swagger';

const {
  API_PROPERTY_QUERY: { PAYMENT_ID },
} = CREATE_PREFERENCE;

export class CreatePreferenceResponseDto {
  @ApiProperty({
    description: PAYMENT_ID.DESC,
    example: PAYMENT_ID.VALUE,
    type: String,
  })
  sandbox_init_point: string;
}
