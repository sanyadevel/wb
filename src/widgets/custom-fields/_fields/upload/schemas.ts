import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('upload'),
    title: z.object({ on: z.boolean(), value: z.string() }).strict(),
    subtitle: z.object({ on: z.boolean(), value: z.string() }).strict(),
    required: z.boolean(),
    label: z.string().min(1, REQUIRED_FIELD),
    hint: z.string(),
    specifiedExt: z.boolean(),
    fileExtensions: z.array(z.string()),
    maxCount: z.number(),
    maxSize: z.number(),
  })
  .strict();

export const lenientStructSchema = z.object({}).merge(structSchema).extend({ label: z.string() });

export const fileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    created_at: z.string().datetime(),
  })
  .strict();

export const valueSchema = z.array(fileSchema);
