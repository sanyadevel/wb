import * as z from 'zod';
import { getFieldValueSchema } from './get-field-value-schema';
import { FieldValueType } from '../_types';
import { lenientField } from './lenient-field';

type ValuesSchema = z.ZodType<Record<string, FieldValueType>>;

export const getValuesSchema = (data: any): ValuesSchema => {
  const valueSchema: Record<string, z.ZodType<FieldValueType>> = {};

  if (data && data.fields && Array.isArray(data.fields)) {
    data.fields.forEach((item: any) => {
      const field = lenientField.safeParse(item);

      if (field.success) {
        valueSchema[field.data.id] = getFieldValueSchema(field.data);
      }
    });
  }

  return z.object(valueSchema).strict();
};
