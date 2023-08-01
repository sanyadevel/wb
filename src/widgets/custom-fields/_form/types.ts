import * as z from 'zod';
import { baseFormSchema, metaSchema, presetFormSchema, viewFormSchema } from './schema';

export type MetaType = z.infer<typeof metaSchema>;

export type FormType = z.infer<typeof baseFormSchema>;

export type PresetFormType = z.infer<typeof presetFormSchema>;

export type ViewFormType = z.infer<typeof viewFormSchema>;
