import { Test, TestingModule } from '@nestjs/testing';
import { AlbumArtController } from './album-art.controller';

describe('AlbumArtController', () => {
  let controller: AlbumArtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumArtController],
    }).compile();

    controller = module.get<AlbumArtController>(AlbumArtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
