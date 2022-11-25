import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `ArtWhale Restapi Server (${process.env.NODE_ENV})`;
  }
}
