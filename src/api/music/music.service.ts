import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumArtService } from 'src/api/album-art/album-art.service';
import { Musics } from 'src/entities/Musics';
import { DataSource } from 'typeorm';
import { MusicFileDto } from './dto/music.dto';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { Files } from 'src/entities/Files';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';
import { UserService } from 'src/api/user/user.service';
import { UsersMusicsLikes } from 'src/entities/UsersMusicsLikes';
import { FileType } from 'src/common/dto/file.dto';

@Injectable()
export class MusicService {
  constructor(
    private dataSource: DataSource,
    private albumArtService: AlbumArtService,
    private userService: UserService,
  ) {}

  async getMusics(userId: number) {
    const musics = await this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'albumFile')
      .getMany();

    return this.getMusicsWithLike(musics, userId);
  }

  async getMusicById(musicId: number, userId: number) {
    const music = await this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'albumFile')
      .where('music.id =:musicId', { musicId })
      .getOne();

    const like = await this.getUserMusicLike(musicId, userId);

    return { ...music, like };
  }

  async getMyMusic(userId: number) {
    const musics = await this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'albumFile')
      .where('music.userId =:userId', { userId })
      .getMany();

    return this.getMusicsWithLike(musics, userId);
  }

  getLikeMusic(userId: number) {
    return this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .leftJoinAndSelect('albumArt.fileId', 'albumFile')
      .leftJoin('music.usersMusicsLikes', 'usersMusicsLikes')
      .where('usersMusicsLikes.userId =:userId', { userId })
      .getMany();
  }

  async getUserMusicLike(musicId: number, userId: number): Promise<boolean> {
    return (await this.dataSource
      .getRepository(UsersMusicsLikes)
      .createQueryBuilder()
      .where('user_id=:userId', { userId })
      .andWhere('music_id=:musicId', { musicId })
      .getOne())
      ? true
      : false;
  }

  async getMusicsWithLike(musics: Musics[], userId: number) {
    const likes = await this.dataSource
      .getRepository(UsersMusicsLikes)
      .createQueryBuilder()
      .where('user_id=:userId', { userId })
      .getRawMany();

    const result = musics.map((music) => {
      return {
        ...music,
        like:
          likes.find((like) => like.UsersMusicsLikes_music_id === music.id) !==
          undefined,
      };
    });

    return result;
  }

  async createMusic(
    userId: number,
    file: Express.Multer.File,
    body: MusicFileDto,
  ) {
    const { albumArtId, title, lyrics, mood } = body;
    const { path, filename, size } = file;
    const duration = (await getAudioDurationInSeconds(path)) * 1000; // 밀리 초 변환

    const albumArt = await this.albumArtService.getAlbumArtById(
      albumArtId,
      userId,
    );
    if (!albumArt) {
      throw new NotFoundException();
    }

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
            path: '/music/' + encodeURIComponent(filename),
            size,
            fileType: FileType.MUSIC,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Musics)
        .values([
          {
            title,
            lyrics,
            mood,
            albumArtId,
            duration,
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
  async updateMusicLike(musicId: number, userId: number) {
    const music = await this.getMusicById(musicId, userId);

    if (!music) {
      throw new HttpException(ErrorMessage.NO_DATA, ErrorCode.NO_DATA);
    }

    if (!music.like) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(UsersMusicsLikes)
        .values([{ musicId, userId, createdAt: new Date() }])
        .execute();
    } else {
      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(UsersMusicsLikes)
        .where('userId=:userId', { userId })
        .andWhere('musicId=:musicId', { musicId })
        .execute();
    }

    return true;
  }
}
