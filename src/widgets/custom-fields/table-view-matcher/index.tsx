import React, { memo } from 'react';
import { FIELD_VALUE_VALIDATION_ERROR } from 'src/constants';
import { checkboxField, dateField, inputField, numberField, questionField, selectField, uploadField } from '../_fields';
import { FieldError } from '../_fields/_components';
import { FieldType, FieldValueType } from '../_types';

type Props = {
  field: FieldType;
  value: FieldValueType;
};

const ValidationError = () => <FieldError>{FIELD_VALUE_VALIDATION_ERROR}</FieldError>;

export const TableViewMatcher = memo(({ field, value }: Props) => {
  if (field.type === 'input') {
    if (inputField.isInputValue(value)) return <inputField.TableView value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'question') {
    if (questionField.isQuestionValue(value)) return <questionField.TableView value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'select') {
    if (selectField.isSelectValue(value)) return <selectField.TableView field={field} value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'date') {
    if (dateField.isDateValue(value)) return <dateField.TableView format={field.format} value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'checkbox') {
    if (checkboxField.isCheckboxValue(value)) return <checkboxField.TableView value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'upload') {
    if (uploadField.isUploadValue(value)) return <uploadField.TableView value={value} />;
    return <ValidationError />;
  }

  if (field.type === 'number') {
    if (numberField.isNumberValue(value)) return <numberField.TableView value={value} />;
    return <ValidationError />;
  }

  return null;
});
