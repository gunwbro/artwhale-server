import { Injectable } from '@nestjs/common';
import { Users } from 'entities/Users';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return this.dataSource
      .createQueryBuilder()
      .select()
      .from(Users, 'users')
      .getMany();
  }
}
