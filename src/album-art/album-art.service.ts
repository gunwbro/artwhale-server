import { HttpException, Injectable } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';
import { AlbumArts } from 'src/entities/AlbumArts';
import { Files } from 'src/entities/Files';
import { DataSource } from 'typeorm';
import { AlbumArtFileDto, AlbumArtMethod } from './dto/album-art.dto';

@Injectable()
export class AlbumArtService {
  constructor(private dataSource: DataSource) {}

  getAlbumArts() {
    return this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder()
      .getMany();
  }

  getAlbumArtById(id: number) {
    return this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder('albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'file')
      .where('albumArt.id=:id', { id })
      .getOne();
  }

  async createAlbumArt(
    userId: number,
    file: Express.Multer.File,
    body: AlbumArtFileDto,
    method: AlbumArtMethod,
  ) {
    const { title, mood } = body;
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
            path: '/album-art/' + encodeURIComponent(filename),
            size,
            fileType: 'album_art',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(AlbumArts)
        .values([
          {
            title,
            method,
            mood,
            fileId: result.identifiers[0].id,
            userId,
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
