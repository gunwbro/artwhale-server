import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mood } from './common/mood';
import { MoodDto } from './common/dto/mood.dto';

@Controller('api')
@ApiTags('COMMON')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mood')
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
