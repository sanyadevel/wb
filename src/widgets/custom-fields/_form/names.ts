import { FieldNameMap } from '../types';
import { FormType } from './types';

export const names: FieldNameMap<FormType> = {
  _: '',
  name: 'name',
  description: 'description',
  expiration: { _: 'expiration', on: 'expiration.on', date: 'expiration.date', time: 'expiration.time' },
  replyLimit: {
    _: 'replyLimit',
    on: 'replyLimit.on',
    participants: 'replyLimit.participants',
    replies: 'replyLimit.replies',
  },
  password: { _: 'password', on: 'password.on', value: 'password.value' },
  endingPage: {
    _: 'endingPage',
    title: 'endingPage.title',
    text: 'endingPage.text',
  },
  answers: {
    _: 'answers',
    multiple: 'answers.multiple',
    anonymous: 'answers.anonymous',
    needEmail: 'answers.needEmail',
    editable: 'answers.editable',
  },
  color: 'color',
  fields: {
    _: 'fields',
    get: (index: number) => ({
      _: `fields[${index}]`,
      id: `fields[${index}].id`,
      title: { _: `fields[${index}].title`, value: `fields[${index}].title.value`, on: `fields[${index}].title.on` },
      subtitle: {
        _: `fields[${index}].subtitle`,
        value: `fields[${index}].subtitle.value`,
        on: `fields[${index}].subtitle.on`,
      },
      type: `fields[${index}].type`,
      label: `fields[${index}].label`,
      readOnly: `fields[${index}].readOnly`,
      hint: `fields[${index}].hint`,
      required: `fields[${index}].required`,
      specifiedExt: `fields[${index}].specifiedExt`,
      fileExtensions: `fields[${index}].fileExtensions`,
      maxCount: `fields[${index}].maxCount`,
      maxSize: `fields[${index}].maxSize`,
      value: `fields[${index}].value`,
    }),
  },
  values: { _: 'values' },
  focusedFieldIndex: 'focusedFieldIndex',
};
