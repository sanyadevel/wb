import { Typography } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const FieldError = memo(({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.root}>
      <Typography>{children}</Typography>
    </div>
  );
});
