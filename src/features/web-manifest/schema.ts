import * as z from 'zod';
import { Deploy } from './constants';

export const webManifestSchema = z.object({
  title: z.string(),
  theme: z.string(),
  deploy: z.nativeEnum(Deploy),
  debug: z.boolean(),
});
