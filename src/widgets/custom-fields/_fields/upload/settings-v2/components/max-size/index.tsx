import { MenuItem, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Select } from 'src/shared/components';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
};

export enum FileSize {
  MB1 = 1048576,
  MB5 = 5242880,
  MB15 = 15728640,
}

export const MaxSize = memo(({ fieldName }: Props) => {
  const { field } = useController<{ name: number }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  return (
    <div className={styles.root}>
      <Typography variant="text">Максимальный размер файла</Typography>
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
        fullWidth
        hiddenLabel
        inputRef={ref}
      >
        <MenuItem value={FileSize.MB1}>1MB</MenuItem>
        <MenuItem value={FileSize.MB5}>5MB</MenuItem>
        <MenuItem value={FileSize.MB15}>15MB</MenuItem>
      </Select>
    </div>
  );
});
