import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mood } from '../common/mood';
import { MoodDto } from '../common/dto/mood.dto';

@Controller()
@ApiTags('COMMON')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/mood')
  @ApiOperation({ summary: '모든 감정(무드) 조회' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [MoodDto],
  })
  getMood() {
    return Mood;
  }
}
