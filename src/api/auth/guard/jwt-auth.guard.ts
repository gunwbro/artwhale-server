import {
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/api/user/user.service';
import { ErrorCode, ErrorMessage } from 'src/common/types';

export interface JwtRequest extends Request {
  user: {
    sub: string;
    id: number;
  };
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException(
        ErrorMessage.NO_TOKEN,
        ErrorCode[ErrorMessage.NO_TOKEN],
      );
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

      if (!user) {
        throw new HttpException(
          ErrorMessage.NO_DATA,
          ErrorCode[ErrorMessage.NO_DATA],
        );
      }

      return verify;
    } catch (e) {
      this.logger.error(e);
      switch (e.message) {
        case 'invalid token':
          throw new HttpException(
            ErrorMessage.INVALID_TOKEN,
            ErrorCode[ErrorMessage.INVALID_TOKEN],
          );
        case 'jwt malformed':
          throw new HttpException(
            ErrorMessage.MALFORMED_TOKEN,
            ErrorCode[ErrorMessage.MALFORMED_TOKEN],
          );
        case 'jwt expired':
          throw new HttpException(
            ErrorMessage.EXPIRED_TOKEN,
            ErrorCode[ErrorMessage.EXPIRED_TOKEN],
          );
        default:
          throw new HttpException(
            ErrorMessage.TOKEN_ERR,
            ErrorCode[ErrorMessage.TOKEN_ERR],
          );
      }
    }
  }
}
