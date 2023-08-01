import { FileUploadRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const BlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <FileUploadRounded color="secondary" fontSize="medium" />
      <Typography variant="text">Загрузка файлов</Typography>
    </div>
  );
});
