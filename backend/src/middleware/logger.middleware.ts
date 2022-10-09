import { UsersLoggerService } from '@/logger/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserLoggerMiddleware implements NestMiddleware {
  constructor(private userLoggerService: UsersLoggerService) {
    this.userLoggerService.setContext(UserLoggerMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this.userLoggerService.debug({
        method,
        originalUrl,
        statusCode,
        userAgent,
        ip,
      });

      if (method === 'POST' || method === 'PUT' || method === 'PATCH')
        this.userLoggerService.debug(
          ` Logging body from request object: ${JSON.stringify(request.body)}`,
        );
    });

    next();
  }
}
