import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDto } from 'src/common/dto/create.dto';
import { GetNoticeDto, NoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';

@Controller('api/notice')
@ApiTags('NOTICE')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

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

  @Post()
  @ApiOperation({ summary: '공지사항 등록' })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateDto,
  })
  createNotice(@Body() bodyData: NoticeDto) {
    return this.noticeService.createNotice(bodyData);
  }
}
