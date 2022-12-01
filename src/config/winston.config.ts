import { utilities } from 'nest-winston';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = './log';

const timezoned = () => {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  utilities.format.nestLike('ArtWhale', {
    prettyPrint: true,
    colors: true,
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  winston.format.printf((info) => {
    return `[ArtWhale] ${info.level} ${info.timestamp} ${info.message}`;
  }),
);

export const WinstonConfig = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
      format: consoleFormat,
    }),
    new winstonDaily({
      level: 'silly',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      filename: `%DATE%.log`,
      dirname: logDir,
      maxFiles: 15,
      format: fileFormat,
    }),

    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      filename: `%DATE%.error.log`,
      dirname: logDir,
      maxFiles: 15,
      format: fileFormat,
    }),
  ],
};

export const LogParameter = {
  HTTP_REQUEST: 'Http Request',
  FILE: 'File',
} as const;

export type LogParameter = typeof LogParameter[keyof typeof LogParameter];

export function ParseObjectToLoggerString(object) {
  return `Object ${JSON.stringify(object)}`;
}
