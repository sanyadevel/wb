import React from 'react';
import {
  ArrowDropDownCircle,
  CheckBoxOutlineBlankTwoTone,
  CheckBoxTwoTone,
  DateRangeTwoTone,
  FileUploadRounded,
  Filter1,
  NotesRounded,
  RadioButtonUncheckedTwoTone,
  ShortTextRounded,
  TextFieldsOutlined,
} from '@mui/icons-material';
import { FieldType } from '../_types';

export const getFieldIcon = (field: FieldType) => {
  if (field.type === 'checkbox') return <CheckBoxTwoTone color="secondary" fontSize="tiny" />;
  if (field.type === 'date') return <DateRangeTwoTone color="secondary" fontSize="tiny" />;
  if (field.type === 'input') {
    if (field.multiline) {
      return <ShortTextRounded color="secondary" fontSize="tiny" />;
    }

    return <NotesRounded color="secondary" fontSize="tiny" />;
  }
  if (field.type === 'number') return <Filter1 color="secondary" fontSize="tiny" />;
  if (field.type === 'question') {
    if (field.multiChoice) {
      return <CheckBoxOutlineBlankTwoTone color="secondary" fontSize="tiny" />;
    }

    return <RadioButtonUncheckedTwoTone color="secondary" fontSize="tiny" />;
  }
  if (field.type === 'select') return <ArrowDropDownCircle color="secondary" fontSize="tiny" />;
  if (field.type === 'text') return <TextFieldsOutlined color="secondary" fontSize="tiny" />;
  if (field.type === 'upload') return <FileUploadRounded color="secondary" fontSize="tiny" />;

  return null;
};
