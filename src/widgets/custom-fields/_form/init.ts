import { FormType } from './types';

export const getInit = (): FormType => ({
  name: 'name',
  description: 'description',
  expiration: { on: false, date: '', time: '' },
  replyLimit: { on: false, participants: -1, replies: -1 },
  password: { on: false, value: '' },
  endingPage: { title: 'Спасибо', text: 'Ваш ответ принят' },
  answers: {
    multiple: false,
    anonymous: false,
    needEmail: false,
    editable: false,
  },
  color: '#FFFFFF',
  fields: [],
  values: {},
  focusedFieldIndex: -1,
});
