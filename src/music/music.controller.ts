import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { JwtAuthGuard, JwtRequest } from 'src/auth/guard/jwt-auth.guard';
import { multerMusicOptions } from 'src/config/multer.options';
import { GetMusicDto, MusicFileDto } from './dto/music.dto';
import { MusicService } from './music.service';

@Controller('api/music')
@ApiTags('MUSIC')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  @ApiOperation({ summary: '모든 음원 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetMusicDto,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMusics() {
    return this.musicService.getMusics();
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
    return this.musicService.createMusic(req.user.sub, file, body);
  }
}
