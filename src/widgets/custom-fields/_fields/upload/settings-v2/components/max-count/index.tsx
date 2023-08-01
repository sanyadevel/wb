import { MenuItem, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Select } from 'src/shared/components';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
};

export const MaxCount = memo(({ fieldName }: Props) => {
  const { field } = useController<{ name: number }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  return (
    <div className={styles.root}>
      <Typography variant="text">Максимальное количество файлов</Typography>
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
        fullWidth
        hiddenLabel
        inputRef={ref}
      >
        <MenuItem value={0}>-</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </div>
  );
});
