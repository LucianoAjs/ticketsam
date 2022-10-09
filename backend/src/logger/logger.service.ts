import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class UsersLoggerService extends ConsoleLogger {
  financingLog(method: string, url: string) {
    this.debug(`Following request has been executed: ${method} - ${url}`);
  }

  prismaError(
    code: string,
    meta,
    clientVersion: string,
    message: string,
    statusCode: number,
  ) {
    this.error(
      `STATUS_CODE - ${statusCode}; CODE - ${code}; CAUSE - ${meta}; CLIENT_VERSION - ${clientVersion}; MESSAGE - ${message}`,
    );
  }
}
