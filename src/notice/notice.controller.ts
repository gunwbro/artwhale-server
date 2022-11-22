import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetNoticeDto } from './dto/notice.dto';

@Controller('api/notice')
@ApiTags('NOTICE')
export class NoticeController {
  constructor(private readonly noticeService) {}

  @Get()
  @ApiOperation({ summary: '모든 공지사항 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetNoticeDto,
  })
  getNotices() {
    return this.noticeService.getNotices();
  }
}
