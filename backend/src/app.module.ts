import { PrismaModule } from '@/database/prisma.module';
import { HealthModule } from '@/health/health.module';
import { UsersLoggerModule } from '@/logger/logger.module';
import { UserLoggerMiddleware } from '@/middleware/logger.middleware';
import { UserModule } from '@/modules/user/user.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    HealthModule,
    UserModule,
    UsersLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserLoggerMiddleware).forRoutes('*');
  }
}
