import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ArtWhale API 문서')
    .setVersion('0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log('Server listening on port ' + (process.env.PORT || 3000));
}
bootstrap();
