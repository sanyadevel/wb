import React, { memo } from 'react';
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

type Props = {
  fieldName: string;
  fieldType: string;
};

export const FieldPresetMatcher = memo(({ fieldName, fieldType }: Props) => {
  if (fieldType === 'text') return <textField.Preset fieldName={fieldName} />;

  if (fieldType === 'input') return <inputField.Preset fieldName={fieldName} />;

  if (fieldType === 'question') return <questionField.Preset fieldName={fieldName} />;

  if (fieldType === 'select') return <selectField.Preset fieldName={fieldName} />;

  if (fieldType === 'date') return <dateField.Preset fieldName={fieldName} />;

  if (fieldType === 'checkbox') return <checkboxField.Preset fieldName={fieldName} />;

  if (fieldType === 'upload') return <uploadField.Preset fieldName={fieldName} />;

  if (fieldType === 'number') return <numberField.Preset fieldName={fieldName} />;

  return null;
});
