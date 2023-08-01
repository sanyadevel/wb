import * as z from 'zod';
import { presetFormSchema } from './preset-form-schema';
import { fieldValues } from '../../_schemas';

export const baseFormSchema = z.object({}).merge(presetFormSchema).extend({ values: fieldValues });
