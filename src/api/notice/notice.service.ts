import { HttpException, Injectable } from '@nestjs/common';
import { ErrorCode, ErrorMessage, FileType } from 'src/common/types';
import { Files } from 'src/entities/Files';
import { Notices } from 'src/entities/Notices';
import { DataSource } from 'typeorm';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(private dataSource: DataSource) {}

  getNotices() {
    return this.dataSource
      .getRepository(Notices)
      .createQueryBuilder('notice')
      .leftJoinAndSelect('notice.fileId', 'file')
      .getMany();
  }

  async createNotice(bodyData: NoticeDto, file: Express.Multer.File) {
    const { filename, size } = file;

    let isSuccess = true;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Files)
        .values([
          {
            originalName: filename,
            path: '/notice/' + encodeURIComponent(filename),
            size,
            fileType: FileType.NOTICE,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Notices)
        .values([
          {
            ...bodyData,
            fileId: result.identifiers[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      isSuccess = false;
    } finally {
      await queryRunner.release();

      if (!isSuccess) {
        throw new HttpException(ErrorMessage.SERVER_ERR, ErrorCode.SERVER_ERR);
      }

      return true;
    }
  }
}
