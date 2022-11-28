import { Module } from '@nestjs/common';
import { AlbumArtController } from './album-art.controller';
import { AlbumArtService } from './album-art.service';

@Module({
  controllers: [AlbumArtController],
  providers: [AlbumArtService]
})
export class AlbumArtModule {}
