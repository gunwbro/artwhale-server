import { HttpStatus } from '@nestjs/common';

export const ErrorMessage = {
  NO_USER: 'NO_USER', // 존재하지 않는 유저
  NO_TOKEN: 'NO_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  MALFORMED_TOKEN: 'MALFORMED_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  TOKEN_ERR: 'TOKEN_ERR',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
} as const;

export type ErrorMessage = typeof ErrorMessage[keyof typeof ErrorMessage];

export const ErrorCode = {
  NO_USER: HttpStatus.UNAUTHORIZED,
  NO_TOKEN: HttpStatus.UNAUTHORIZED,
  INVALID_TOKEN: HttpStatus.UNAUTHORIZED,
  MALFORMED_TOKEN: HttpStatus.UNAUTHORIZED,
  EXPIRED_TOKEN: HttpStatus.GONE,
  TOKEN_ERR: HttpStatus.UNAUTHORIZED,
  ALREADY_EXISTS: HttpStatus.FORBIDDEN,
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];
