import { Test, TestingModule } from '@nestjs/testing';
import { Notices } from 'src/entities/Notices';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

const testNotices: Notices[] = [
  {
    id: 1,
    title: 'title',
    content: 'content',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('NoticeController', () => {
  let controller: NoticeController;
  let service: NoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeController],
      providers: [NoticeService],
    }).compile();

    controller = module.get<NoticeController>(NoticeController);
    service = module.get<NoticeService>(NoticeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNotices', () => {
    it('should return an array of notices', async () => {
      jest
        .spyOn(service, 'getNotices')
        .mockImplementation(async () => await testNotices);

      expect(await controller.getNotices()).toBe(testNotices);
    });
  });
});
