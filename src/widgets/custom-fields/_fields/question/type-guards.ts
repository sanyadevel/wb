import { valueSchema } from './schemas';
import { Value } from './types';

export const isQuestionValue = (value: any): value is Value => {
  return valueSchema.safeParse(value).success;
};
