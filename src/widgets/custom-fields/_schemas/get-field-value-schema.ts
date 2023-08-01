import * as zod from 'zod';
import {
  checkboxField,
  dateField,
  inputField,
  numberField,
  questionField,
  selectField,
  textField,
  uploadField,
} from '../_fields';
import { FieldType, FieldValueType } from '../_types';

export const getFieldValueSchema = (field: FieldType): zod.ZodType<FieldValueType> => {
  if (field.type === 'text') return textField.getValueSchema(field);

  if (field.type === 'input') return inputField.getValueSchema(field);

  if (field.type === 'question') return questionField.getValueSchema(field);

  if (field.type === 'select') return selectField.getValueSchema(field);

  if (field.type === 'date') return dateField.getValueSchema(field);

  if (field.type === 'checkbox') return checkboxField.getValueSchema(field);

  if (field.type === 'upload') return uploadField.getValueSchema(field);

  if (field.type === 'number') return numberField.getValueSchema(field);

  return zod.undefined();
};
