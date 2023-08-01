import * as z from 'zod';
import { webManifestSchema } from './schema';

export type WebManifest = z.infer<typeof webManifestSchema>;
