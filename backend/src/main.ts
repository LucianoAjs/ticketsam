import { AppModule } from '@/app.module';
import { bootstrapDocs } from '@/swagger/bootstrap-docs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  bootstrapDocs(app);

  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`listen on PORT ${process.env.SERVER_PORT}.`);
  });
}
bootstrap();
