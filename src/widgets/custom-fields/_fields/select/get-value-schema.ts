import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';
import { Struct, Value } from './types';

export const getValueSchema = (props: Struct): z.ZodType<Value> => {
  if (props.multiChoice) {
    const base = z.array(z.string());

    if (props.required) return base.min(1, REQUIRED_FIELD);
    return base;
  }

  const base = z.string();

  if (props.required) return base.min(1, REQUIRED_FIELD);
  return base;
};
