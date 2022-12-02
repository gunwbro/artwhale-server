import { ApiProperty } from '@nestjs/swagger';
import { FileDto, GetDto } from 'src/common/common.dto';

interface INotice {
  title: string;
  content: string;
}
export class NoticeDto implements INotice {
  @ApiProperty({
    example: '공지사항 1',
    description: '공지사항 제목',
  })
  title: string;

  @ApiProperty({
    example: '공지합니다.',
    description: '내용',
  })
  content: string;
}

export class NoticeFileDto implements INotice {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({
    example: '공지사항 1',
    description: '공지사항 제목',
  })
  title: string;

  @ApiProperty({
    example: '공지합니다.',
    description: '내용',
  })
  content: string;
}

export class GetNoticeDto extends GetDto implements INotice {
  @ApiProperty({
    example: '공지사항 1',
    description: '공지사항 제목',
  })
  title: string;

  @ApiProperty({
    example: '공지합니다.',
    description: '내용',
  })
  content: string;

  @ApiProperty({
    description: '파일',
    type: FileDto,
  })
  fileId: FileDto;
}
