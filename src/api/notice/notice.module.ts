import { Module, Logger } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  providers: [NoticeService, Logger],
  controllers: [NoticeController],
})
export class NoticeModule {}
