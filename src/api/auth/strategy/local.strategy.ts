import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Users } from 'src/entities/Users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'email' });
  }

  async validate(email: string): Promise<Users> {
    let user = await this.authService.validateUser(email);

    if (!user) {
      await this.authService.join({
        nickname: email.split('@')[0],
        email,
      });
      user = await this.authService.validateUser(email);
    }

    return user;
  }
}
