import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/api/user/user.module';
import { UserService } from 'src/api/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, JwtStrategy, LocalStrategy, UserService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
