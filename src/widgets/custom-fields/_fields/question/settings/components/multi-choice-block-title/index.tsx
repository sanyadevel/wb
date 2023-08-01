import { CheckBoxOutlineBlankTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const MultiChoiceBlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <CheckBoxOutlineBlankTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Несколько из списка</Typography>
    </div>
  );
});
