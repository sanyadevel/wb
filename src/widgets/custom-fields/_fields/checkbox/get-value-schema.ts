import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';
import { valueSchema } from './schemas';
import { Struct, Value } from './types';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_literal) {
    if (issue.expected === true) {
      return { message: REQUIRED_FIELD };
    }
  }

  return { message: ctx.defaultError };
};

export const getValueSchema = (props: Struct): z.ZodType<Value> => {
  if (props.required) return z.literal(true, { errorMap: customErrorMap });
  return valueSchema;
};
