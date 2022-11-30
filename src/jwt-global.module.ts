import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
