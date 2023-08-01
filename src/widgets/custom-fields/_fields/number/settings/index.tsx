import React, { memo } from 'react';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { BlockTitle } from './components';

type Props = {
  fieldName: string;
};

export const Settings = memo(({ fieldName }: Props) => {
  return (
    <SettingsLayout>
      <BlockTitle />
      <TogglesLayout>
        <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
        <ToggleWithText fieldName={`${fieldName}.${names.readOnly}`} title="Только для чтения" />
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.placeholder}`} title="Подсказка в поле" />
        <InputWithText fieldName={`${fieldName}.${names.defaultValue}`} title="Значение по-умолчанию" type="number" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
        <InputWithText fieldName={`${fieldName}.${names.comment}`} title="Подсказка под полем" />
      </InputsLayout>
    </SettingsLayout>
  );
});
