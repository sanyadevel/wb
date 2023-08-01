import * as z from 'zod';
import { structSchema, valueSchema, variantSchema } from './schemas';

export type Variant = z.infer<typeof variantSchema>;

export type Struct = z.infer<typeof structSchema>;

export type Value = z.infer<typeof valueSchema>;
