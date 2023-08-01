import { nanoid } from 'nanoid';
import { Struct } from './types';

export const getInit = (multi: boolean): Struct => ({
  id: nanoid(),
  type: 'input',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  required: false,
  readOnly: false,
  label: '',
  placeholder: '',
  defaultValue: '',
  hint: '',
  comment: '',
  multiline: multi,
});
