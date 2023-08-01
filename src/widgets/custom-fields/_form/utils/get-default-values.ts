import { FieldsType, FieldValuesType } from '../../_types';
import { getDefaultFieldValue } from './get-default-field-value';

export const getDefaultValues = (fields: FieldsType): FieldValuesType => {
  const values: FieldValuesType = {};
  fields.forEach(field => {
    values[field.id] = getDefaultFieldValue(field);
  });

  return values;
};
