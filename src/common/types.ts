import { HttpStatus } from '@nestjs/common';

export const FileType = {
  MUSIC: 'music',
  ALBUM_ART: 'album_art',
  PROFILE: 'profile',
  NOTICE: 'notice',
} as const;

export type FileType = typeof FileType[keyof typeof FileType];

export const ErrorMessage = {
  NO_DATA: 'NO_DATA', // 존재하지 않는 데이터
  NO_TOKEN: 'NO_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  MALFORMED_TOKEN: 'MALFORMED_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  TOKEN_ERR: 'TOKEN_ERR',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  SERVER_ERR: 'SERVER_ERR',
} as const;

export type ErrorMessage = typeof ErrorMessage[keyof typeof ErrorMessage];

export const ErrorCode = {
  NO_DATA: HttpStatus.UNAUTHORIZED,
  NO_TOKEN: HttpStatus.UNAUTHORIZED,
  INVALID_TOKEN: HttpStatus.UNAUTHORIZED,
  MALFORMED_TOKEN: HttpStatus.UNAUTHORIZED,
  EXPIRED_TOKEN: HttpStatus.GONE,
  TOKEN_ERR: HttpStatus.UNAUTHORIZED,
  ALREADY_EXISTS: HttpStatus.FORBIDDEN,
  SERVER_ERR: HttpStatus.INTERNAL_SERVER_ERROR,
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];
