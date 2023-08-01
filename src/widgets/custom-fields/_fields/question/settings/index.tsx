import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { Struct } from '../types';
import { MultiChoiceBlockTitle, SingleChoiceBlockTitle } from './components';

type Props = {
  fieldName: string;
};

export const Settings = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });

  return (
    <SettingsLayout>
      {fieldProps.multiChoice ? <MultiChoiceBlockTitle /> : <SingleChoiceBlockTitle />}
      <TogglesLayout>
        <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.multiChoice}`} title="Множественный выбор" />
        <ToggleWithText fieldName={`${fieldName}.${names.ownVariant}`} title="Свой вариант" />
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
      </InputsLayout>
    </SettingsLayout>
  );
});
