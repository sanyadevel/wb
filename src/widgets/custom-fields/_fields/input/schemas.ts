import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('input'),
    title: z.object({ on: z.boolean(), value: z.string() }).strict(),
    subtitle: z.object({ on: z.boolean(), value: z.string() }).strict(),
    required: z.boolean(),
    readOnly: z.boolean(),
    label: z.string().min(1, REQUIRED_FIELD),
    placeholder: z.string(),
    defaultValue: z.string(),
    hint: z.string(),
    comment: z.string(),
    multiline: z.boolean(),
  })
  .strict();

export const lenientStructSchema = z.object({}).merge(structSchema).extend({ label: z.string() });

export const valueSchema = z.string();
