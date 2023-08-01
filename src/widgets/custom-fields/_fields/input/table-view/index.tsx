import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { Value } from '../types';
import styles from './index.module.scss';

type Props = {
  value: Value;
};

export const TableView = memo(({ value }: Props) => {
  return (
    <Typography className={styles.root} variant="text">
      {value}
    </Typography>
  );
});
