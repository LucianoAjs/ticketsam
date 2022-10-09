import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedException extends HttpException {
  @ApiProperty({
    type: Number,
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    example: 'Unauthorized',
  })
  message: string;

  @ApiProperty({
    type: String,
    example: 'Unauthorized',
  })
  error: string;

  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
