import { ApiProperty } from '@nestjs/swagger';

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
