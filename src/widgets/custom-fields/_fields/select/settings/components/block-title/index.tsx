import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { ArrowDropDownCircleIcon } from 'src/shared/components';
import styles from './index.module.scss';

export const BlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <ArrowDropDownCircleIcon color="secondary" fontSize="medium" />
      <Typography variant="text">Раскрывающийся список</Typography>
    </div>
  );
});
