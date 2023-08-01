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
  fieldValueName?: string;
};

export const FieldSettingsMatcherV2 = memo(({ fieldName, onClose, fieldType, fieldValueName }: Props) => {
  let Field: any = null; // todo any

  if (fieldType === 'text') Field = textField.SettingsV2;

  if (fieldType === 'input') Field = inputField.SettingsV2;

  if (fieldType === 'question') Field = questionField.SettingsV2;

  if (fieldType === 'select') Field = selectField.SettingsV2;

  if (fieldType === 'date') Field = dateField.SettingsV2;

  if (fieldType === 'checkbox') Field = checkboxField.SettingsV2;

  if (fieldType === 'upload') Field = uploadField.SettingsV2;

  if (fieldType === 'number') Field = numberField.SettingsV2;

  return (
    <Layout>
      <Field fieldName={fieldName} fieldValueName={fieldValueName} />
    </Layout>
  );
});
