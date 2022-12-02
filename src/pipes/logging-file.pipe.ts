import {
  PipeTransform,
  Injectable,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import {
  JsonStringifyWithPrefix,
  LogParameter,
} from 'src/configs/winston.config';

@Injectable()
export class LoggingFilePipe implements PipeTransform {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  transform(value: any) {
    this.logger.log(
      JsonStringifyWithPrefix(value, LogParameter.FILE),
      LogParameter.FILE,
    );
    return value;
  }
}
