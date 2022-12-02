import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync, unlink } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtRequest } from 'src/api/auth/guard/jwt-auth.guard';

function getFilesWithExtensions(path, name) {
  const fileNameWithPath = path + '/' + name;
  return [
    fileNameWithPath + '.jpg',
    fileNameWithPath + '.jpeg',
    fileNameWithPath + '.png',
  ];
}

export const multerUserProfileOptions: MulterOptions = {
  storage: diskStorage({
    destination: (request: JwtRequest, file, callback) => {
      const uploadPath = 'public/profile';
      const { sub } = request.user;
      const files = getFilesWithExtensions(uploadPath, sub);

      if (!existsSync(uploadPath)) {
        // image 폴더 없을 시 폴더 생성
        mkdirSync(uploadPath, { recursive: true });
      } else {
        files.forEach((file) => {
          if (existsSync(file)) {
            unlink(file, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        });
      }

      callback(null, uploadPath);
    },

    filename: (request: JwtRequest, file, callback) => {
      const { sub } = request.user;
      callback(null, sub + extname(file.originalname));
    },
  }),
};

export const multerMusicOptions: MulterOptions = {
  storage: diskStorage({
    destination: (request: JwtRequest, file, callback) => {
      const uploadPath = 'public/music';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      callback(null, uploadPath);
    },

    filename: (request: JwtRequest, file, callback) => {
      const { sub } = request.user;
      callback(null, sub + '-' + Date.now() + extname(file.originalname));
    },
  }),
};

export const multerAlbumArtOptions: MulterOptions = {
  storage: diskStorage({
    destination: (request: JwtRequest, file, callback) => {
      const uploadPath = 'public/album-art';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      callback(null, uploadPath);
    },

    filename: (request: JwtRequest, file, callback) => {
      const { sub } = request.user;
      callback(null, sub + '-' + Date.now() + extname(file.originalname));
    },
  }),
};

export const multerNoticeOptions: MulterOptions = {
  storage: diskStorage({
    destination: (request: JwtRequest, file, callback) => {
      const uploadPath = 'public/notice';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      callback(null, uploadPath);
    },

    filename: (request: Request, file, callback) => {
      callback(null, Date.now() + extname(file.originalname));
    },
  }),
};
