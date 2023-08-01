import * as z from 'zod';
import { field } from './field';

export const fields = z.array(field);
