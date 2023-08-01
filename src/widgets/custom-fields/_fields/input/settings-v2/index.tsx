import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { Struct } from '../types';
import { ParagraphBlockTitle, StringBlockTitle } from './components';

type Props = {
  fieldName: string;
};

export const SettingsV2 = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });

  return (
    <SettingsLayout>
      {fieldProps.multiline ? <ParagraphBlockTitle /> : <StringBlockTitle />}
      <TogglesLayout>
        {/*         <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" /> */}
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
        {/* <ToggleWithText fieldName={`${fieldName}.${names.readOnly}`} title="Только для чтения" /> */}
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.placeholder}`} title="Подсказка в поле" />
        <InputWithText fieldName={`${fieldName}.${names.defaultValue}`} title="Значение по-умолчанию" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
        <InputWithText fieldName={`${fieldName}.${names.comment}`} title="Подсказка под полем" />
      </InputsLayout>
    </SettingsLayout>
  );
});
