import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumArtService } from 'src/album-art/album-art.service';
import { Musics } from 'src/entities/Musics';
import { DataSource } from 'typeorm';
import { MusicFileDto } from './dto/music.dto';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { Files } from 'src/entities/Files';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';
import { UserService } from 'src/user/user.service';
@Injectable()
export class MusicService {
  constructor(
    private dataSource: DataSource,
    private albumArtService: AlbumArtService,
    private userService: UserService,
  ) {}

  getMusics() {
    return this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .getMany();
  }

  getMusicById(id: number) {
    return this.dataSource
      .getRepository(Musics)
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.fileId', 'file')
      .leftJoinAndSelect('music.albumArtId', 'albumArt')
      .where('music.id =:id', { id })
      .getOne();
  }

  async createMusic(
    email: string,
    file: Express.Multer.File,
    body: MusicFileDto,
  ) {
    const { albumArtId, title, lyrics, mood } = body;
    const { path, filename, size } = file;
    const duration = (await getAudioDurationInSeconds(path)) * 1000; // 밀리 초 변환

    const albumArt = await this.albumArtService.getAlbumArtById(albumArtId);
    if (!albumArt) {
      throw new NotFoundException();
    }
    const user = await this.userService.getUserByEmail(email);
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
            fileType: 'music',
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
            userId: user.id,
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
