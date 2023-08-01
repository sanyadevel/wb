import * as z from 'zod';
import { fieldValue } from './field-value';

export const fieldValues = z.record(z.string(), fieldValue);
