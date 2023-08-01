import { nanoid } from 'nanoid';
import { Struct } from './types';

export const getInit = (): Struct => ({
  id: nanoid(),
  type: 'number',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  required: false,
  readOnly: false,
  label: '',
  placeholder: '',
  defaultValue: 0,
  hint: '',
  comment: '',
});
