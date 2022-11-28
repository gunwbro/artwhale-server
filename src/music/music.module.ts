import { Logger, Module } from '@nestjs/common';
import { AlbumArtService } from 'src/album-art/album-art.service';
import { UserService } from 'src/user/user.service';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  providers: [MusicService, Logger, UserService, AlbumArtService],
  controllers: [MusicController],
})
export class MusicModule {}
