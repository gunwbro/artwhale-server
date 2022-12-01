import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UserService } from 'src/api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/api/user/dto/user.dto';

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
    const payload = { nickname: user.nickname, sub: user.email, id: user.id };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      access_token,
      user,
    };
  }

  async join(body: UserDto) {
    await this.userService.createUser(body);
  }
}
