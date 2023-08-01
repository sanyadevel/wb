import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { FIELD_VALUE_VALIDATION_ERROR, UNDEFINED_FIELD_ERROR } from 'src/constants';
import {
  checkboxField,
  dateField,
  inputField,
  questionField,
  textField,
  selectField,
  uploadField,
  numberField,
} from '../_fields';
import { FieldType, FieldValueType } from '../_types';
import { FieldError } from '../_fields/_components';

type Props = {
  fieldName: string;
  valueName: string;
};

const ValidationError = () => <FieldError>{FIELD_VALUE_VALIDATION_ERROR}</FieldError>;

export const FieldViewMatcher = memo(({ fieldName, valueName }: Props) => {
  const field: FieldType | undefined = useWatch({ name: fieldName });
  const value: FieldValueType | undefined = useWatch({ name: valueName });

  if (!field) {
    console.warn(`Поле с именем ${fieldName} не найдено`);
    return <FieldError>{UNDEFINED_FIELD_ERROR}</FieldError>;
  }

  if (field.type === 'text') return <textField.View fieldName={fieldName} />;

  if (field.type === 'input') {
    if (inputField.isInputValue(value)) return <inputField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'question') {
    if (questionField.isQuestionValue(value)) return <questionField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'select') {
    if (selectField.isSelectValue(value)) return <selectField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'date') {
    if (dateField.isDateValue(value)) return <dateField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'checkbox') {
    if (checkboxField.isCheckboxValue(value)) return <checkboxField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'upload') {
    if (uploadField.isUploadValue(value)) return <uploadField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  if (field.type === 'number') {
    if (numberField.isNumberValue(value)) return <numberField.View fieldName={fieldName} valueName={valueName} />;
    return <ValidationError />;
  }

  return null;
});
