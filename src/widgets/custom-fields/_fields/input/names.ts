import { FieldNameMap } from '../../types';
import { Struct } from './types';

export const names: FieldNameMap<Struct> = {
  _: '',
  id: 'id',
  type: 'type',
  title: { _: 'title', value: 'title.value', on: 'title.on' },
  subtitle: { _: 'subtitle', value: 'subtitle.value', on: 'subtitle.on' },
  required: 'required',
  label: 'label',
  hint: 'hint',
  comment: 'comment',
  readOnly: 'readOnly',
  defaultValue: 'defaultValue',
  placeholder: 'placeholder',
  multiline: 'multiline',
};
