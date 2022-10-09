import { UsersLoggerService } from '@/logger/logger.service';

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

const notFoundCode = 'P2025';
const uniqueConstraintError = 'P2002';

export class PrismaException {
  constructor(
    private readonly error,
    private readonly usersLoggerService: UsersLoggerService,
  ) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === notFoundCode) {
        this.usersLoggerService.prismaError(
          error.code,
          error.meta.cause,
          error.clientVersion,
          error.message,
          HttpStatus.NOT_FOUND,
        );
        throw new NotFoundException();
      }

      if (error.code === uniqueConstraintError) {
        this.usersLoggerService.prismaError(
          error.code,
          error.meta.target,
          error.clientVersion,
          error.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new PrismaClientKnownRequestError(
        error.message,
        error.code,
        error.clientVersion,
      );
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError)
      throw new PrismaClientUnknownRequestError(
        error.message,
        error.clientVersion,
      );

    if (error instanceof Prisma.PrismaClientRustPanicError)
      throw new PrismaClientRustPanicError(error.message, error.clientVersion);

    if (error instanceof Prisma.PrismaClientInitializationError)
      throw new PrismaClientInitializationError(
        error.message,
        error.clientVersion,
      );

    if (error instanceof Prisma.PrismaClientValidationError)
      throw new PrismaClientValidationError(error.message);
  }
}
