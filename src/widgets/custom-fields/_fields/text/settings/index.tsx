import React, { memo } from 'react';
import { SettingsLayout } from '../../_components';
import { BlockTitle } from './components';

type Props = {
  fieldName: string;
};

export const Settings = memo(({ fieldName }: Props) => {
  return (
    <SettingsLayout>
      <BlockTitle />
    </SettingsLayout>
  );
});
