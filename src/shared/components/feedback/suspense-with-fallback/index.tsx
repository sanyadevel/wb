import React, { PropsWithChildren, Suspense } from 'react';
import { Typography } from '@mui/material';
import styles from './index.module.scss';

export const SuspenseWithFallback = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <div className={styles.root}>
          <Typography variant="text">Загружаем килобайты...</Typography>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
