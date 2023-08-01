import { nanoid } from 'nanoid';
import { Struct } from './types';

export const getInit = (): Struct => ({
  id: nanoid(),
  type: 'checkbox',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  text: 'Ответ',
  required: false,
  defaultValue: false,
  label: '',
  hint: '',
  comment: '',
});
