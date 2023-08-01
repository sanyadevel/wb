import { DateRangeTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const BlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <DateRangeTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Дата</Typography>
    </div>
  );
});
