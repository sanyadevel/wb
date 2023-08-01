import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';

export const variantSchema = z.object({ id: z.string(), title: z.string().min(1, REQUIRED_FIELD) }).strict();

export const lenientVariantSchema = z.object({ id: z.string(), title: z.string() }).strict();

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('select'),
    title: z.object({ on: z.boolean(), value: z.string() }).strict(),
    subtitle: z.object({ on: z.boolean(), value: z.string() }).strict(),
    required: z.boolean(),
    label: z.string().min(1, REQUIRED_FIELD),
    defaultValue: z.union([z.string(), z.array(z.string())]),
    hint: z.string(),
    comment: z.string(),
    multiChoice: z.boolean(),
    variants: z.array(variantSchema),
  })
  .strict();

export const lenientStructSchema = z
  .object({})
  .merge(structSchema)
  .extend({ label: z.string(), variants: z.array(lenientVariantSchema) });

export const valueSchema = z.union([z.string(), z.array(z.string())]);
