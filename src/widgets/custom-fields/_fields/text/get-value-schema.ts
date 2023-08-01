import * as z from 'zod';
import { valueSchema } from './schemas';
import { Struct, Value } from './types';

export const getValueSchema = (props: Struct): z.ZodType<Value> => {
  return valueSchema;
};
