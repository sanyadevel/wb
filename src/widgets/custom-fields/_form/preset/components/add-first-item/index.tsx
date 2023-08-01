import { Add } from '@mui/icons-material';
import { IconButton, IconButtonProps, Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

type Props = {
  onClick: IconButtonProps['onClick'];
};

export const AddFirstItem = memo(({ onClick }: Props) => {
  return (
    <div className={styles.root}>
      <Typography color="secondary" variant="subtext">
        Добавьте ваш первый элемент
      </Typography>
      <IconButton onClick={onClick} size="small">
        <Add />
      </IconButton>
    </div>
  );
});
