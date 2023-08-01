import React, { memo } from 'react';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { BlockTitle, Format } from './components';

type Props = {
  fieldName: string;
};

export const SettingsV2 = memo(({ fieldName }: Props) => {
  return (
    <SettingsLayout>
      <BlockTitle />
      <TogglesLayout>
        {/*         <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" /> */}
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
      </TogglesLayout>
      <InputsLayout>
        <Format fieldName={`${fieldName}.${names.format}`} />
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
        <InputWithText fieldName={`${fieldName}.${names.comment}`} title="Подсказка под полем" />
      </InputsLayout>
    </SettingsLayout>
  );
});
