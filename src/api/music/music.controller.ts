import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { IdDto } from 'src/common/dto/common.dto';
import { multerMusicOptions } from 'src/config/multer.options';
import { LogParameter, ObjectJsonStringify } from 'src/config/winston.config';
import {
  GetMusicDto,
  GetMusicWithLikeDto,
  MusicFileDto,
} from './dto/music.dto';
import { MusicService } from './music.service';

@Controller('api/music')
@ApiTags('MUSIC')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 음원 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetMusicWithLikeDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMusics(@Req() req: JwtRequest) {
    return this.musicService.getMusics(req.user.id);
  }

  @Get('my')
  @ApiOperation({ summary: '내가 만든 음원 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetMusicWithLikeDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMyMusic(@Req() req: JwtRequest) {
    return this.musicService.getMyMusic(req.user.id);
  }

  @Get('like')
  @ApiOperation({ summary: '좋아요 한 음원 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetMusicDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getLikeMusic(@Req() req: JwtRequest) {
    return this.musicService.getLikeMusic(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: '음원 등록' })
  @ApiBearerAuth('Authorization')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '저장할 음원',
    type: MusicFileDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('music', multerMusicOptions))
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  createMusic(
    @Req() req: JwtRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: MusicFileDto,
  ) {
    this.logger.log(ObjectJsonStringify(file), LogParameter.FILE);
    return this.musicService.createMusic(req.user.id, file, body);
  }

  @Patch('like')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '음원 좋아요 업데이트 (이미 좋아요면 좋아요 해제)',
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  updateMusicLike(@Body() body: IdDto, @Req() req: JwtRequest) {
    return this.musicService.updateMusicLike(body.id, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 음원 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetMusicWithLikeDto,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMusicById(
    @Param('id', ParseIntPipe) musicId: number,
    @Req() req: JwtRequest,
  ) {
    return this.musicService.getMusicById(musicId, req.user.id);
  }
}
