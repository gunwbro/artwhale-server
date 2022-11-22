import { Injectable } from '@nestjs/common';
import { Notices } from 'src/entities/Notices';
import { DataSource } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(private dataSource: DataSource) {}

  getNotices() {
    return this.dataSource
      .getRepository(Notices)
      .createQueryBuilder()
      .getMany();
  }
}
