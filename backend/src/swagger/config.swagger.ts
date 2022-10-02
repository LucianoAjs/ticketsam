import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setSwaggerConfig = (
  app: INestApplication,
  title: string,
  description: string,
  version: string,
  routes: string,
) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(routes, app, document);
};
