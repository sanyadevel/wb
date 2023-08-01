import * as z from 'zod';
import { metaSchema } from './meta-schema';

export const lenientMetaSchema = z
  .object({})
  .merge(metaSchema)
  .extend({
    endingPage: z
      .object({
        title: z.string(),
        text: z.string(),
      })
      .strict(),
  });
