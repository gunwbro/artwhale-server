import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { DataSource } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  getUsers() {
    return this.dataSource.getRepository(Users).createQueryBuilder().getMany();
  }

  getUserByEmail(email: string) {
    return this.dataSource
      .getRepository(Users)
      .createQueryBuilder()
      .where('email=:email', { email })
      .getOne();
  }

  createUser(data: UserDto) {
    const { email, nickname } = data;
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          email,
          nickname,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .execute();
  }
}
