import { RadioButtonUncheckedTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const SingleChoiceBlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <RadioButtonUncheckedTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Один из списка</Typography>
    </div>
  );
});
