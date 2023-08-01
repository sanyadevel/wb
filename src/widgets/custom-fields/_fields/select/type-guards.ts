import { valueSchema } from './schemas';
import { Value } from './types';

export const isSelectValue = (value: any): value is Value => {
  return valueSchema.safeParse(value).success;
};
