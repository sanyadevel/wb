import * as z from 'zod';
import { presetFormSchema } from './preset-form-schema';
import { getValuesSchema } from '../../_schemas';

export const getFormSchema = (data: any) => {
  z.object({})
    .merge(presetFormSchema)
    .extend({ values: getValuesSchema(data) });
};
