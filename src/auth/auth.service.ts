import { Injectable, HttpException } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<Users> {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: Users) {
    const payload = { nickname: user.nickname, sub: user.email };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      nickname: user.nickname,
      email: user.email,
      access_token,
    };
  }

  async join(body: UserDto) {
    const { nickname, email } = body;

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new HttpException(
        ErrorMessage.ALREADY_EXISTS,
        ErrorCode[ErrorMessage.ALREADY_EXISTS],
      );
    }

    const payload = { nickname, sub: email };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });

    await this.userService.createUser(body);

    return {
      nickname,
      email,
      access_token,
    };
  }
}
