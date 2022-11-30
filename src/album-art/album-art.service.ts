import { HttpException, Injectable } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';
import { AlbumArts } from 'src/entities/AlbumArts';
import { Files } from 'src/entities/Files';
import { UsersAlbumArtsLikes } from 'src/entities/UsersAlbumArtsLikes';
import { DataSource } from 'typeorm';
import { AlbumArtFileDto, AlbumArtMethod } from './dto/album-art.dto';

@Injectable()
export class AlbumArtService {
  constructor(private dataSource: DataSource) {}

  async getAlbumArts(userId: number) {
    const albumArts = await this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder('albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'file')
      .getMany();

    return this.getAlbumArtsWithLike(albumArts, userId);
  }

  async getAlbumArtById(albumArtId: number, userId: number) {
    const albumArt = await this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder('albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'file')
      .where('albumArt.id=:albumArtId', { albumArtId })
      .getOne();

    const like = await this.getUserAlbumArtLike(albumArtId, userId);

    return { ...albumArt, like };
  }

  async getMyAlbumArt(userId: number) {
    const albumArt = await this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder('albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'file')
      .where('albumArt.user_id =:userId', { userId })
      .getMany();

    return this.getAlbumArtsWithLike(albumArt, userId);
  }

  getLikeAlbumArt(userId: number) {
    return this.dataSource
      .getRepository(AlbumArts)
      .createQueryBuilder('albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'file')
      .leftJoin('albumArt.usersAlbumArtsLikes', 'usersAlbumArtsLikes')
      .where('usersAlbumArtsLikes.userId =:userId', { userId })
      .getMany();
  }

  async getUserAlbumArtLike(albumArtId: number, userId: number) {
    return (await this.dataSource
      .getRepository(UsersAlbumArtsLikes)
      .createQueryBuilder()
      .where('user_id=:userId', { userId })
      .andWhere('album_art_id=:albumArtId', { albumArtId })
      .getOne())
      ? true
      : false;
  }

  async getAlbumArtsWithLike(albumArts: AlbumArts[], userId: number) {
    const likes = await this.dataSource
      .getRepository(UsersAlbumArtsLikes)
      .createQueryBuilder()
      .where('user_id=:userId', { userId })
      .getRawMany();

    const result = albumArts.map((albumArt) => {
      return {
        ...albumArt,
        like:
          likes.find(
            (like) => like.UsersAlbumArtsLikes_album_art_id === albumArt.id,
          ) !== undefined,
      };
    });

    return result;
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

  async updateAlbumArtLike(albumArtId: number, userId: number) {
    const albumArt = await this.getAlbumArtById(albumArtId, userId);

    if (!albumArt) {
      throw new HttpException(ErrorMessage.NO_DATA, ErrorCode.NO_DATA);
    }

    const albumArtike = await this.getUserAlbumArtLike(albumArtId, userId);

    if (!albumArtike) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(UsersAlbumArtsLikes)
        .values([{ albumArtId, userId, createdAt: new Date() }])
        .execute();
    } else {
      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(UsersAlbumArtsLikes)
        .where('userId=:userId', { userId })
        .andWhere('albumArtId=:albumArtId', { albumArtId })
        .execute();
    }

    return true;
  }
}
