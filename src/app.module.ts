import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormConfig from '../ormconfig.json';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
