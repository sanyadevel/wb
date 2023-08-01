import { FieldType, FieldValueType } from '../../_types';
import { dateField, inputField, numberField, questionField, textField, uploadField } from '../../_fields';

export const getDefaultFieldValue = (field: FieldType): FieldValueType => {
  if (field.type === 'text') return textField.defaultValue;

  if (field.type === 'input') return inputField.defaultValue;

  if (field.type === 'question') return questionField.defaultValue;

  if (field.type === 'select') return field.defaultValue;

  if (field.type === 'date') return dateField.defaultValue;

  if (field.type === 'checkbox') return field.defaultValue;

  if (field.type === 'upload') return uploadField.defaultValue;

  if (field.type === 'number') return numberField.defaultValue;

  return undefined;
};
