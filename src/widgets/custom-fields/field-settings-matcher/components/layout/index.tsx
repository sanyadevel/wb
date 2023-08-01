import { CloseRounded } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

type Props = {
  onClose: () => void;
};

export const Layout = memo(({ onClose, children }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h3">Параметры блока</Typography>
        <IconButton color="secondary" onClick={onClose} size="small">
          <CloseRounded />
        </IconButton>
      </div>
      {children}
    </div>
  );
});
