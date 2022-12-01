import { ApiProperty } from '@nestjs/swagger';

export class TokenInfoDto {
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

  @ApiProperty({
    example: 435239245495,
    description: '토큰 남은 시간',
  })
  expiresIn: string;
}
