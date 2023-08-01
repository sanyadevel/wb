import * as z from 'zod';
import { metaSchema } from './meta-schema';
import { fields } from '../../_schemas';

export const presetFormSchema = z.object({}).merge(metaSchema).extend({ fields, focusedFieldIndex: z.number() });
