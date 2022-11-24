import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import ormConfig from '../ormconfig.json';
import { WinstonModule, utilities } from 'nest-winston';
import winston from 'winston';
import { CoreModule } from './common/core.module';

const timezoned = () => {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: './log/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({ format: timezoned }),
            utilities.format.nestLike('ArtWhale', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: './log/combined.log',
          level: 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('ArtWhale', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    CoreModule,
    AuthModule,
    UserModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
