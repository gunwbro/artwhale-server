import { ApiProperty } from '@nestjs/swagger';

export class SuccessLoginDto {
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
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7ZmN6ri464-ZIiwic3ViIjozLCJpYXQiOjE2Mjc3MTQzMzYsImV4cCI6MTY1OTI1MDMzNn0.fTFPZra5WVDD1ho2n5-CVJC6fB0POueMBsS_QDlmzxQ',
    description: 'access token',
  })
  access_token: string;
}
