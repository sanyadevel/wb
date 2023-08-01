import * as z from 'zod';
import { structSchema, valueSchema } from './schemas';

export type Struct = z.infer<typeof structSchema>;

export type Value = z.infer<typeof valueSchema>;
