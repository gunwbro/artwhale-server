import { ApiProperty } from '@nestjs/swagger';
import { GetDto } from 'src/common/dto/get.dto';

interface IUser {
  nickname: string;
  email: string;
}
export class UserDto implements IUser {
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

export class GetUserDto extends GetDto implements IUser {
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
