import { ApiProperty } from '@nestjs/swagger';
import { FileType } from './types';

export class IdDto {
  @ApiProperty({
    example: 1,
    description: '고유 번호',
  })
  id: number;
}

export class MoodDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
  })
  id: number;

  @ApiProperty({
    example: 'happy',
    description: '감정',
  })
  text: string;
}

export class GetDto {
  @ApiProperty({
    example: 1,
    description: '고유 번호',
  })
  id: number;

  @ApiProperty({
    example: '2022-11-16T07:00:47.000Z',
    description: '생성된 시각',
  })
  createdAt: string;

  @ApiProperty({
    example: '2022-11-16T07:00:47.000Z',
    description: '변경된 시각',
  })
  updatedAt: string;
}

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
