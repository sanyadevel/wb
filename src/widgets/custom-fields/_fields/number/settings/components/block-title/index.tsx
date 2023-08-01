import Filter1Icon from '@mui/icons-material/Filter1';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const BlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <Filter1Icon color="secondary" fontSize="medium" />
      <Typography variant="text">Число</Typography>
    </div>
  );
});
