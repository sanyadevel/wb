import { nanoid } from 'nanoid';
import { Struct } from './types';
import { FileSize } from './settings/components';

export const getInit = (): Struct => ({
  id: nanoid(),
  type: 'upload',
  title: { value: '', on: true },
  subtitle: { value: '', on: false },
  label: '',
  required: false,
  specifiedExt: false,
  fileExtensions: [],
  maxCount: 0,
  maxSize: FileSize.MB15,
  hint: '',
});
