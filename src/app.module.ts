import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import ormConfig from '../ormconfig.json';
import { CoreModule } from './core.module';
import { MusicModule } from './music/music.module';
import { AlbumArtModule } from './album-art/album-art.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    CoreModule,
    AuthModule,
    UserModule,
    NoticeModule,
    MusicModule,
    AlbumArtModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
