import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('date'),
    title: z.object({ on: z.boolean(), value: z.string() }).strict(),
    subtitle: z.object({ on: z.boolean(), value: z.string() }).strict(),
    required: z.boolean(),
    label: z.string().min(1, REQUIRED_FIELD),
    hint: z.string(),
    comment: z.string(),
    format: z.string(),
  })
  .strict();

export const lenientStructSchema = z.object({}).merge(structSchema).extend({ label: z.string() });

export const valueSchema = z.string().nullable();
