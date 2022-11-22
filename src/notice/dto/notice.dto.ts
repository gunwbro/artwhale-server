import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from 'src/common/dto/get.dto';

interface INotice {
  title: string;
  content: string;
}
export class NoticeDto implements INotice {
  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  title: string;

  @ApiProperty({
    example: 'shit@google.com',
    description: '이메일',
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
