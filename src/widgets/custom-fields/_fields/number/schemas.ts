import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('number'),
    title: z.object({ on: z.boolean(), value: z.string() }).strict(),
    subtitle: z.object({ on: z.boolean(), value: z.string() }).strict(),
    required: z.boolean(),
    readOnly: z.boolean(),
    label: z.string().min(1, REQUIRED_FIELD),
    placeholder: z.string(),
    defaultValue: z.coerce.number(),
    hint: z.string(),
    comment: z.string(),
  })
  .strict();

export const lenientStructSchema = z.object({}).merge(structSchema).extend({ label: z.string() });

export const valueSchema = z.coerce.number();
