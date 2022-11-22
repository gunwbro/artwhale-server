import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from 'src/common/dto/get.dto';

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
}
