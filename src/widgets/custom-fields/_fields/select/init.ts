import { nanoid } from 'nanoid';
import { Struct, Variant } from './types';

export const getVariantInit = (): Variant => ({
  id: nanoid(),
  title: 'Ответ',
});

export const getInit = (multi: boolean): Struct => ({
  id: nanoid(),
  type: 'select',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  required: false,
  label: '',
  multiChoice: multi,
  defaultValue: multi ? [] : '',
  hint: '',
  comment: '',
  variants: [getVariantInit(), getVariantInit(), getVariantInit()],
});
