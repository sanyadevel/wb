import * as z from 'zod';
import { fieldValues } from './field-values';
import { getValuesSchema } from './get-values-schema';

type ViewFormType = {
  values: z.infer<typeof fieldValues>;
};

export const valuesFromFields = z.custom<ViewFormType>((val: any) => {
  const schema: z.ZodType<ViewFormType> = z.object({ values: getValuesSchema(val) });

  return schema.parse(val);
});
