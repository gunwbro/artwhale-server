import { ApiProperty } from '@nestjs/swagger';
import { FileDto, GetDto } from 'src/common/common.dto';

interface IAlbumArt {
  title: string;
  method: AlbumArtMethod;
  mood: string;
}

export const AlbumArtMethod = {
  USER: 'user',
  AI: 'ai',
} as const;

export type AlbumArtMethod = typeof AlbumArtMethod[keyof typeof AlbumArtMethod];

export class AlbumArtDto implements IAlbumArt {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: 'user',
    description: '종류',
  })
  method: AlbumArtMethod;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;
}

export class AlbumArtFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: 'happy',
    description: '감정',
  })
  mood: string;
}

export class GetAlbumArtDto extends GetDto implements IAlbumArt {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: 'user',
    description: '종류',
  })
  method: AlbumArtMethod;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    description: '파일',
    type: FileDto,
  })
  fileId: FileDto;
}

export class GetAlbumArtWithLikeDto extends GetDto implements IAlbumArt {
  @ApiProperty({
    example: '비행기',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: 'user',
    description: '종류',
  })
  method: AlbumArtMethod;

  @ApiProperty({
    example: 'happy',
    description: '감정(무드)',
  })
  mood: string;

  @ApiProperty({
    description: '파일',
    type: FileDto,
  })
  fileId: FileDto;

  @ApiProperty({
    example: true,
    description: '좋아요 여부',
  })
  like: boolean;
}
