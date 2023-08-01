import { Typography } from '@mui/material';
import React, { PropsWithChildren, memo } from 'react';
import styles from './index.module.scss';

export const BlockTitleWrapper = memo(({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.root}>
      <Typography>Настройки поля</Typography>
      <div className={styles.content}>{children}</div>
    </div>
  );
});
