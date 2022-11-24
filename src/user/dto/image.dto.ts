import { ApiProperty } from '@nestjs/swagger';

export default class ImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
