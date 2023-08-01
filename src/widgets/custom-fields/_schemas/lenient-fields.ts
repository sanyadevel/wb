import * as z from 'zod';
import { lenientField } from './lenient-field';

export const lenientFields = z.array(lenientField);
