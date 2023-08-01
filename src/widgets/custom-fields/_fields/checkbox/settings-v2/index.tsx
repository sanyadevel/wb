import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { InputsLayout, SettingsLayout, TogglesLayout } from '../../_components';
import { names } from '../names';
import { Struct } from '../types';
import { BlockTitle } from './components';

type Props = {
  fieldName: string;
};

export const SettingsV2 = memo(({ fieldName }: Props) => {
  const required: Struct['required'] = useWatch({ name: `${fieldName}.${names.required}` });

  return (
    <SettingsLayout>
      <BlockTitle />
      <TogglesLayout>
        {/*         <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" /> */}
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
        {!required && <ToggleWithText fieldName={`${fieldName}.${names.defaultValue}`} title="Отмечено по-умолчанию" />}
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
        <InputWithText fieldName={`${fieldName}.${names.comment}`} title="Подсказка под полем" />
        <InputWithText fieldName={`${fieldName}.${names.text}`} title="Текст чекбокса" />
      </InputsLayout>
    </SettingsLayout>
  );
});
