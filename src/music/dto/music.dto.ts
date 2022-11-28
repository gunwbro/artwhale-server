import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from 'src/common/dto/get.dto';

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
}
