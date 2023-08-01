import { ShortTextRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const StringBlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <ShortTextRounded color="secondary" fontSize="medium" />
      <Typography variant="text">Текст (строка)</Typography>
    </div>
  );
});
