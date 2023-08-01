import { Typography } from '@mui/material';
import React, { memo } from 'react';
import dayjs from 'dayjs';
import { Value } from '../types';

type Props = {
  value: Value;
  format: string;
};

export const TableView = memo(({ value, format }: Props) => {
  return (
    <Typography variant="text">{value ? dayjs(value).format(format || 'DD.MM.YYYY') : 'Дата не выбрана'}</Typography>
  );
});
