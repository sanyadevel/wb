import { REQUIRED_FIELD, WRONG_DATE } from 'src/constants';
import * as z from 'zod';
import { Struct, Value } from './types';

export const getValueSchema = (props: Struct): z.ZodType<Value> => {
  if (props.required) return z.string({ invalid_type_error: REQUIRED_FIELD }).datetime(WRONG_DATE);
  return z.string().datetime(WRONG_DATE).nullable();
};
