import { FileType } from './types';

export function getFilePath(fileType: FileType, fileName: string) {
  const typeToPath = {
    music: '/music/',
    album_art: '/album-art/',
    notice: '/notice/',
    profile: '/profile/',
  };

  return typeToPath[fileType] + encodeURIComponent(fileName);
}
