import * as z from 'zod';
import {
  checkboxField,
  dateField,
  inputField,
  questionField,
  selectField,
  textField,
  uploadField,
  numberField,
} from '../_fields';

export const field = z.discriminatedUnion('type', [
  textField.structSchema,
  inputField.structSchema,
  questionField.structSchema,
  selectField.structSchema,
  dateField.structSchema,
  checkboxField.structSchema,
  uploadField.structSchema,
  numberField.structSchema,
]);
