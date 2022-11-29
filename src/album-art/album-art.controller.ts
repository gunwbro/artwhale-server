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
import { multerAlbumArtOptions } from 'src/config/multer.options';
import { AlbumArtService } from './album-art.service';
import {
  AlbumArtFileDto,
  AlbumArtMethod,
  GetAlbumArtDto,
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
    type: GetAlbumArtDto,
  })
  getAlbumArts() {
    return this.albumArtService.getAlbumArts();
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
}
