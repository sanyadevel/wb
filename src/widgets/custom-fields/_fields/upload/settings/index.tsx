import { Collapse } from '@mui/material';
import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { Struct } from '../types';
import { BlockTitle, Extensions, MaxCount, MaxSize } from './components';

type Props = {
  fieldName: string;
};

export const Settings = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });

  return (
    <SettingsLayout>
      <BlockTitle />
      <TogglesLayout>
        <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
        <div>
          <ToggleWithText fieldName={`${fieldName}.${names.specifiedExt}`} title="Только определенный тип файлов" />
          <Collapse in={fieldProps.specifiedExt}>
            <Extensions fieldName={`${fieldName}.${names.fileExtensions._}`} />
          </Collapse>
        </div>
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <MaxCount fieldName={`${fieldName}.${names.maxCount}`} />
        <MaxSize fieldName={`${fieldName}.${names.maxSize}`} />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
      </InputsLayout>
    </SettingsLayout>
  );
});
