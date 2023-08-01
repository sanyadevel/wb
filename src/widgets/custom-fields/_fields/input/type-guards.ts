import { valueSchema } from './schemas';
import { Value } from './types';

export const isInputValue = (value: any): value is Value => {
  return valueSchema.safeParse(value).success;
};
