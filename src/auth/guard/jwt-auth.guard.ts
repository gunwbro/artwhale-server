import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException('NO_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    const token = authorization.replace('Bearer ', '');

    request.user = await this.validateToken(token);

    return true;
  }

  async validateToken(token: string) {
    try {
      const verify = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const email = verify.sub;
      const user = await this.userService.getUserByEmail(email);

      console.log(user);

      return verify;
    } catch (e) {
      switch (e.message) {
        case 'invalid token':
          throw new HttpException('INVALID_TOKEN', 401);
        case 'jwt malformed':
          throw new HttpException('MALFORMED_TOKEN', 401);
        case 'jwt expired':
          throw new HttpException('EXPIRED_TOKEN', 410);
        default:
          throw new HttpException('TOKEN_ERR', 401);
      }
    }
  }
}
