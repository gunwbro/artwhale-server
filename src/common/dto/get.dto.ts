import { ApiProperty } from '@nestjs/swagger';

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
