import { ApiProperty } from '@nestjs/swagger';
import { GetAlbumArtDto } from 'src/api/album-art/dto/album-art.dto';
import { FileDto, GetDto } from 'src/common/common.dto';

interface IMusic {
  title: string;
  lyrics: string;
  mood: string;
  duration: number;
}
export class MusicDto implements IMusic {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '떴다 떴다 비행기',
    description: '가사',
  })
  lyrics: string;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    example: 4131514531,
    description: '노래 길이',
  })
  duration: number;
}

export class MusicFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  music: string;

  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '떴다 떴다 비행기',
    description: '가사',
  })
  lyrics: string;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    example: 1,
    description: '앨범아트 아이디',
  })
  albumArtId: number;
}

export class GetMusicDto extends GetDto implements IMusic {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '떴다 떴다 비행기',
    description: '가사',
  })
  lyrics: string;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    example: 4131514531,
    description: '노래 길이',
  })
  duration: number;

  @ApiProperty({
    description: '파일',
    type: FileDto,
  })
  fileId: FileDto;

  @ApiProperty({
    description: '앨범 아트',
    type: GetAlbumArtDto,
  })
  albumArtId: GetAlbumArtDto;
}

export class GetMusicWithLikeDto extends GetDto implements IMusic {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '떴다 떴다 비행기',
    description: '가사',
  })
  lyrics: string;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    example: 4131514531,
    description: '노래 길이',
  })
  duration: number;

  @ApiProperty({
    example: true,
    description: '좋아요 여부',
  })
  like: boolean;

  @ApiProperty({
    description: '파일',
    type: FileDto,
  })
  fileId: FileDto;

  @ApiProperty({
    description: '앨범 아트',
    type: GetAlbumArtDto,
  })
  albumArtId: GetAlbumArtDto;
}
