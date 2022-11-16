import { Controller, UseGuards, Post, Req, Get, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { SuccessLoginDto } from './dto/success.login.dto';
import { TokenInfoDto } from './dto/token-info.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: SuccessLoginDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'shit@google.com',
        },
      },
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: SuccessLoginDto,
  })
  @Post('join')
  join(@Body() body: UserDto) {
    return this.authService.join(body);
  }

  @ApiOperation({ summary: 'Access Token 정보 보기' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'success',
    type: TokenInfoDto,
  })
  @Get('tokenInfo')
  tokenInfo(@Req() req) {
    return {
      email: req.user.sub,
      nickname: req.user.nickname,
      expiresIn: req.user.exp,
    };
  }
}
