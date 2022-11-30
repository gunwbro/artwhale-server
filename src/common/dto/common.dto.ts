import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({
    example: 1,
    description: '고유 번호',
  })
  id: number;
}