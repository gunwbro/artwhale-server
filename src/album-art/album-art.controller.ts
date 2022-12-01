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
import { IdDto } from 'src/common/dto/common.dto';
import { multerAlbumArtOptions } from 'src/config/multer.options';
import { AlbumArtService } from './album-art.service';
import {
  AlbumArtFileDto,
  AlbumArtMethod,
  GetAlbumArtDto,
  GetAlbumArtWithLikeDto,
} from './dto/album-art.dto';

@Controller('api/album-art')
@ApiTags('ALBUM_ART')
export class AlbumArtController {
  constructor(private readonly albumArtService: AlbumArtService) {}

  @Get()
  @ApiOperation({ summary: '모든 사람이 만든 앨범 아트 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetAlbumArtWithLikeDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getAlbumArts(@Req() req: JwtRequest) {
    return this.albumArtService.getAlbumArts(req.user.id);
  }

  @Get('my')
  @ApiOperation({ summary: '내가 만든 앨범 아트 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetAlbumArtWithLikeDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMyAlbumArt(@Req() req: JwtRequest) {
    return this.albumArtService.getMyAlbumArt(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: '앨범 아트 등록' })
  @ApiBearerAuth('Authorization')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '앨범아트 Request Body',
    type: AlbumArtFileDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerAlbumArtOptions))
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  createAlbumArt(
    @Req() req: JwtRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AlbumArtFileDto,
  ) {
    return this.albumArtService.createAlbumArt(
      req.user.id,
      file,
      body,
      AlbumArtMethod.USER,
    );
  }

  @Get('like')
  @ApiOperation({ summary: '좋아요 한 앨범 아트 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetAlbumArtDto],
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getLikeMusic(@Req() req: JwtRequest) {
    return this.albumArtService.getLikeAlbumArt(req.user.id);
  }

  @Patch('like')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '앨범 아트 좋아요 업데이트 (이미 좋아요면 좋아요 해제)',
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: Boolean,
  })
  updateAlbumArtLike(@Body() body: IdDto, @Req() req: JwtRequest) {
    return this.albumArtService.updateAlbumArtLike(body.id, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 앨범 아트 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetAlbumArtWithLikeDto,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  getMusicById(
    @Param('id', ParseIntPipe) albumArtId: number,
    @Req() req: JwtRequest,
  ) {
    return this.albumArtService.getAlbumArtById(albumArtId, req.user.id);
  }
}
