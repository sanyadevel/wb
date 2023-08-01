import * as z from 'zod';
import { valueSchema } from './schemas';
import { Struct, Value } from './types';

export const getValueSchema = (props: Struct): z.ZodType<Value> => {
  // if (props.required) return valueSchema.min(1, REQUIRED_FIELD); todo
  return valueSchema;
};
