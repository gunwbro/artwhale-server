import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, JwtRequest } from 'src/auth/guard/jwt-auth.guard';
import { GetUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('USER')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetUserDto],
  })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get()
  @ApiOperation({ summary: '내 정보 확인' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetUserDto,
  })
  getUserById(@Req() req: JwtRequest) {
    return this.userService.getUserByEmail(req.user.sub);
  }
}
