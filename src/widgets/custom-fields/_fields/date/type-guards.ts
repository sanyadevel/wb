import { valueSchema } from './schemas';
import { Value } from './types';

export const isDateValue = (value: any): value is Value => {
  return valueSchema.safeParse(value).success;
};
