import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from './get.dto';

export const FileType = {
  MUSIC: 'music',
  ALBUM_ART: 'album_art',
  PROFILE: 'profile',
  NOTICE: 'notice',
} as const;

export type FileType = typeof FileType[keyof typeof FileType];

export class FileDto extends GetDto {
  @ApiProperty({
    example: '1511351.jpg',
    description: '파일 이름',
  })
  originalName: string;

  @ApiProperty({
    example: FileType.NOTICE,
    description: '파일 타입',
  })
  fileType: FileType;

  @ApiProperty({
    example: 34622345,
    description: '파일 크기',
  })
  size: string;

  @ApiProperty({
    example: '/notice/214514.jpg',
    description: '파일 경로 (base url 뒤에 붙여서 사용)',
  })
  path: string;
}
