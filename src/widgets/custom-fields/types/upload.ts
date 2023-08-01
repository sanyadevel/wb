import { FileType } from './file-type';

export type Upload = (file: File) => Promise<FileType>;
