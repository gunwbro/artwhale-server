import { ApiProperty } from '@nestjs/swagger';

export default class NicknameDto {
  @ApiProperty({
    example: '홍길동',
    description: '닉네임',
  })
  nickname: string;
}
