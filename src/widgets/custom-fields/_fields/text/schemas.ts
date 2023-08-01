import * as z from 'zod';

export const structSchema = z
  .object({
    id: z.string(),
    type: z.literal('text'),
    value: z.string(),
    label: z.string(), // todo обсудить что делать
  })
  .strict();

export const lenientStructSchema = z.object({}).merge(structSchema);

export const valueSchema = z.undefined();
