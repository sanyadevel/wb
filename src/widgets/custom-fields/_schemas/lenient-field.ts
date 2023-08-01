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

export const lenientField = z.discriminatedUnion('type', [
  textField.lenientStructSchema,
  inputField.lenientStructSchema,
  questionField.lenientStructSchema,
  selectField.lenientStructSchema,
  dateField.lenientStructSchema,
  checkboxField.lenientStructSchema,
  uploadField.lenientStructSchema,
  numberField.lenientStructSchema,
]);
