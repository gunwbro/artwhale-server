import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, Logger],
  controllers: [UserController],
})
export class UserModule {}
