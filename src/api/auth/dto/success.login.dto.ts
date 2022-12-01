import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from 'src/api/user/dto/user.dto';

export class SuccessLoginDto {
  @ApiProperty({
    description: '유저 정보',
    type: GetUserDto,
  })
  albumArtId: GetUserDto;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7ZmN6ri464-ZIiwic3ViIjozLCJpYXQiOjE2Mjc3MTQzMzYsImV4cCI6MTY1OTI1MDMzNn0.fTFPZra5WVDD1ho2n5-CVJC6fB0POueMBsS_QDlmzxQ',
    description: 'access token',
  })
  access_token: string;
}
