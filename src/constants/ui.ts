export const REQUIRED_FIELD = 'Обязательно для заполнения';
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 256;
export const TOO_SHORT_NAME = `Название должно содержать более ${MIN_NAME_LENGTH - 1} символов`;
export const TOO_LONG_NAME = `Название должно содержать менее ${MAX_NAME_LENGTH + 1} символов`;
export const WRONG_DATE = 'Неверный формат даты';
export const FIELD_ANIMATION_DURATION = 500;
export const FORM_SAVING_INTERVAL = 500;

export const FIELD_VALUE_VALIDATION_ERROR = 'Ошибка валидации значения поля';
export const UNDEFINED_FIELD_ERROR = 'Поле не найдено.';

export const REGEX_CODE = /^[A-Z]{2,10}$/;
export const ERROR_CODE = 'Только латинские буквы в верхнем регистре A-Z без пробелов';

export const FILE_TYPES: Record<string, Array<string>> = {
  wordDoc: ['doc', 'docx'],
  pdf: ['pdf'],
  jpeg: ['jpeg', 'jpg'],
  png: ['png'],
  gif: ['gif'],
};

export const INIT_PAGE_LIMIT = 20;

export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: INIT_PAGE_LIMIT,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 99999,
    label: 'Все',
  },
];

export const DEFAULT_SORT_DIRECTION = 'desc';

export const ROCKET_CHAT_USER_LINK = 'https://go.rocket.chat/room?host=rocket-chat.wb.ru&path=direct/';
export const ROCKET_CHAT_CHANNEL_LINK = 'https://go.rocket.chat/room?host=rocket-chat.wb.ru&path=channel/';
