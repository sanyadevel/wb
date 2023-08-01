import { nanoid } from 'nanoid';
import { Struct } from './types';

export const getInit = (): Struct => ({
  id: nanoid(),
  type: 'date',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  required: false,
  format: 'DD.MM.YYYY',
  label: '',
  hint: '',
  comment: '',
});
