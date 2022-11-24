import { S3AdapterModule } from '@/adapters/s3-adapter/s3-adapter.module';
import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/database/prisma.module';
import { HealthModule } from '@/health/health.module';
import { UsersLoggerModule } from '@/logger/logger.module';
import { UserLoggerMiddleware } from '@/middleware/logger.middleware';
import { UserBuyerModule } from '@/modules/user-buyer/user-buyer.module';
import { UserSellerModule } from '@/modules/user-seller/user-seller.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
    }),
    PrismaModule,
    HealthModule,
    UserSellerModule,
    UsersLoggerModule,
    AuthModule,
    S3AdapterModule,
    UserBuyerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserLoggerMiddleware).forRoutes('*');
  }
}
