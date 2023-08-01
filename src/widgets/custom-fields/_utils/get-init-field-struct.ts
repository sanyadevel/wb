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
import { FieldType, FieldTypeName } from '../_types';

export const getInitFieldStruct = (type: FieldTypeName): FieldType => {
  if (type === 'text') return textField.getInit();

  if (type === 'input') return inputField.getInit(false);

  if (type === 'question') return questionField.getInit(false);

  if (type === 'select') return selectField.getInit(false);

  if (type === 'date') return dateField.getInit();

  if (type === 'checkbox') return checkboxField.getInit();

  if (type === 'upload') return uploadField.getInit();

  if (type === 'number') return numberField.getInit();

  return textField.getInit();
};
