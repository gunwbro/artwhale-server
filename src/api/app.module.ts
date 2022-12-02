import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import ormConfig from '../../ormconfig.json';
import { JwtGlobalModule } from './auth/jwt-global.module';
import { MusicModule } from './music/music.module';
import { AlbumArtModule } from './album-art/album-art.module';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogParameter } from 'src/config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    JwtGlobalModule,
    AuthModule,
    UserModule,
    NoticeModule,
    MusicModule,
    AlbumArtModule,
    MorganModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor((tokens, req: any, res) => {
        Logger.log(
          [
            req.user ? req.user.sub : '',
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            JSON.stringify(req.body),
          ].join(' '),
          LogParameter.HTTP_REQUEST,
        );
        return null;
      }),
    },
  ],
})
export class AppModule {}
