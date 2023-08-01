import React, { memo } from 'react';
import {
  questionField,
  inputField,
  selectField,
  textField,
  uploadField,
  checkboxField,
  dateField,
  numberField,
} from '../_fields';
import { Layout } from './components';

type Props = {
  fieldName: string;
  fieldType: string;
  onClose: () => void;
};

export const FieldSettingsMatcher = memo(({ fieldName, onClose, fieldType }: Props) => {
  let Field: any = null; // todo any

  if (fieldType === 'text') Field = textField.Settings;

  if (fieldType === 'input') Field = inputField.Settings;

  if (fieldType === 'question') Field = questionField.Settings;

  if (fieldType === 'select') Field = selectField.Settings;

  if (fieldType === 'date') Field = dateField.Settings;

  if (fieldType === 'checkbox') Field = checkboxField.Settings;

  if (fieldType === 'upload') Field = uploadField.Settings;

  if (fieldType === 'number') Field = numberField.Settings;

  return (
    <Layout onClose={onClose}>
      <Field fieldName={fieldName} />
    </Layout>
  );
});
