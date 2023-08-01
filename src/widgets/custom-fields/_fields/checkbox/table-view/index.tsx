import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { Value } from '../types';

type Props = {
  value: Value;
};

export const TableView = memo(({ value }: Props) => {
  return <Typography variant="text">{value ? 'ДА' : 'НЕТ'}</Typography>;
});
