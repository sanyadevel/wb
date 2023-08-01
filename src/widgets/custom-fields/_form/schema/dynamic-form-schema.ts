import * as z from 'zod';
import { baseFormSchema } from './base-form-schema';
import { presetFormSchema } from './preset-form-schema';
import { getValuesSchema } from '../../_schemas';

type DynamicFormType = z.infer<typeof baseFormSchema>;

export const dynamicFormSchema = z.custom<DynamicFormType>((val: any) => {
  const schema: z.ZodType<DynamicFormType> = z
    .object({})
    .merge(presetFormSchema)
    .extend({ values: getValuesSchema(val) });

  return schema.parse(val);
});
