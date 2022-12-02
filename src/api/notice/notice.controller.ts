import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IdDto } from 'src/common/common.dto';
import { multerNoticeOptions } from 'src/configs/multer.options';
import { LoggingFilePipe } from 'src/pipes/logging-file.pipe';
import { GetNoticeDto, NoticeFileDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';

@Controller('api/notice')
@ApiTags('NOTICE')
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 공지사항 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [GetNoticeDto],
  })
  getNotices() {
    return this.noticeService.getNotices();
  }

  @Post()
  @ApiOperation({ summary: '공지사항 등록' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '저장할 음원',
    type: NoticeFileDto,
  })
  @UseInterceptors(FileInterceptor('image', multerNoticeOptions))
  @ApiResponse({
    status: 201,
    description: 'success',
    type: IdDto,
  })
  createNotice(
    @Body() bodyData: NoticeFileDto,
    @UploadedFile(LoggingFilePipe) image: Express.Multer.File,
  ) {
    return this.noticeService.createNotice(bodyData, image);
  }
}
