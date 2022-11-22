import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
