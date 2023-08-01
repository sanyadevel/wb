import { nanoid } from 'nanoid';
import { Struct } from './types';

export const getInit = (): Struct => ({
  id: nanoid(),
  type: 'text',
  value: '',
  label: '',
});
