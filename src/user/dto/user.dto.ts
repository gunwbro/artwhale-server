import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from 'src/common/dto/get.dto';

export class UserDto extends GetDto {
  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: 'shit@google.com',
    description: '이메일',
  })
  email: string;
}
