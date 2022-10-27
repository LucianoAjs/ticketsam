import { DOCUMENT } from '@/modules/user/constants/document.constant';
import { ApiProperty } from '@nestjs/swagger';

export class DocumentResponseDto {
  @ApiProperty({
    example: 201,
    type: Number,
  })
  status: number;

  @ApiProperty({
    example: DOCUMENT.API_RESPONSE.SUCCESS_OPERATION.VALUE,
    type: String,
  })
  description: string;
}
