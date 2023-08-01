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

export const fieldValue = z.union([
  textField.valueSchema,
  inputField.valueSchema,
  questionField.valueSchema,
  selectField.valueSchema,
  dateField.valueSchema,
  checkboxField.valueSchema,
  uploadField.valueSchema,
  numberField.valueSchema,
]);
