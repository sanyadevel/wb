import { nanoid } from 'nanoid';
import { Struct, Variant } from './types';

export const getVariantInit = (): Variant => ({
  id: nanoid(),
  title: 'Ответ',
});

export const getInit = (multi: boolean): Struct => ({
  id: nanoid(),
  type: 'question',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  ownVariant: false,
  required: false,
  hint: '',
  multiChoice: multi,
  label: '',
  variants: [getVariantInit(), getVariantInit(), getVariantInit()],
});
