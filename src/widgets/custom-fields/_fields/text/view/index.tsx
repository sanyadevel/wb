import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { MarkdownView } from 'src/shared/components';
import { Struct } from '../types';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
};

export const View = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  return <div className={styles.root}>{fieldProps.value && <MarkdownView value={fieldProps.value} />}</div>;
});
