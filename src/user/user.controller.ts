import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    type: GetUserDto,
  })
  getUsers() {
    return this.userService.getUsers();
  }
}
