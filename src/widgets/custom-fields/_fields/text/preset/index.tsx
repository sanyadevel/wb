import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './index.module.scss';
import { names } from '../names';
import { PresetMarkdown } from '../../_components';
import { state } from '../state';

type Props = {
  fieldName: string;
};

export const Preset = memo(({ fieldName }: Props) => {
  const { upload } = useRecoilValue(state);

  return (
    <div className={styles.root}>
      <PresetMarkdown fieldName={`${fieldName}.${names.value}`} fontSize="1rem" upload={upload} />
    </div>
  );
});
