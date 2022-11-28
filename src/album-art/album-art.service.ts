import { Injectable } from '@nestjs/common';
import { AlbumArts } from 'src/entities/AlbumArts';
import { DataSource } from 'typeorm';

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
}
