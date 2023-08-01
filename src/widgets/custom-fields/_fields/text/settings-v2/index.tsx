import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { InputsLayout, PresetMarkdown, SettingsLayout } from '../../_components';
import { BlockTitle } from './components';
import { state } from '../state';
import { names } from '../names';
import { InputWithText } from '../../../input-with-text';

type Props = {
  fieldName: string;
};

export const SettingsV2 = memo(({ fieldName }: Props) => {
  const { upload } = useRecoilValue(state);

  return (
    <SettingsLayout>
      <BlockTitle />
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <PresetMarkdown fieldName={`${fieldName}.${names.value}`} fontSize="1rem" upload={upload} />
      </InputsLayout>
    </SettingsLayout>
  );
});
