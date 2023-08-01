import * as z from 'zod';
import { lenientMetaSchema } from './lenient-meta-schema';
import { lenientFields } from '../../_schemas';

export const lenientPresetFormSchema = z
  .object({})
  .merge(lenientMetaSchema)
  .extend({ fields: lenientFields, focusedFieldIndex: z.number() });
