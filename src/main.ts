import { Logger, LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { AppModule } from './api/app.module';
import { WinstonConfig } from './configs/winston.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(WinstonConfig),
  });

  app.enableCors(); // CORS
  app.useStaticAssets(join(__dirname, '../..', 'public')); // Public 제공

  // 스웨거 설정
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

  const logger = app.get<LoggerService>(Logger);

  logger.log('Node Environment: ' + process.env.NODE_ENV);
  logger.log('Server Port: ' + (process.env.PORT || 3000));
}
bootstrap();
