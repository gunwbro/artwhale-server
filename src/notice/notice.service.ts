import { Injectable } from '@nestjs/common';
import { Notices } from 'src/entities/Notices';
import { DataSource } from 'typeorm';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(private dataSource: DataSource) {}

  getNotices() {
    return this.dataSource
      .getRepository(Notices)
      .createQueryBuilder()
      .getMany();
  }
  async createNotice(bodyData: NoticeDto) {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Notices)
      .values([{ ...bodyData, createdAt: new Date(), updatedAt: new Date() }])
      .execute();
  }
}
