import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, JwtRequest } from 'src/api/auth/guard/jwt-auth.guard';
import { multerUserProfileOptions } from 'src/config/multer.options';
import {
  LogParameter,
  ParseObjectToLoggerString,
} from 'src/config/winston.config';
import ImageDto from './dto/image.dto';
import NicknameDto from './dto/nickname.dto';
import { GetUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('USER')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

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

  @Get('info')
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

  @Patch('nickname')
  @ApiOperation({ summary: '유저 닉네임 변경' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: '변경할 닉네임',
    type: NicknameDto,
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  patchUserNickname(@Req() req: JwtRequest, @Body() body: NicknameDto) {
    return this.userService.patchUserNickname(req.user.sub, body.nickname);
  }

  @Patch('image')
  @ApiOperation({ summary: '유저 프로필 사진 변경' })
  @ApiBearerAuth('Authorization')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '저장할 이미지',
    type: ImageDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerUserProfileOptions))
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  patchUserImage(
    @Req() req: JwtRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 }), // 최대 20MB
          new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ }), // jpg, jpeg, png 만 가능
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log(ParseObjectToLoggerString(file), LogParameter.FILE);
    return this.userService.patchUserImage(req.user.sub, file);
  }
}
