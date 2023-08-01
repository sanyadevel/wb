import { valueSchema } from './schemas';
import { Value } from './types';

export const isUploadValue = (value: any): value is Value => {
  return valueSchema.safeParse(value).success;
};
