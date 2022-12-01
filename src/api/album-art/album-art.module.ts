import { Logger, Module } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { AlbumArtController } from './album-art.controller';
import { AlbumArtService } from './album-art.service';

@Module({
  controllers: [AlbumArtController],
  providers: [AlbumArtService, Logger, UserService],
})
export class AlbumArtModule {}
