import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Users } from 'src/entities/Users';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'email' });
  }

  async validate(email: string): Promise<Users> {
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new HttpException(
        ErrorMessage.NO_USER,
        ErrorCode[ErrorMessage.NO_USER],
      );
    }

    return user;
  }
}
