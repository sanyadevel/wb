import { NotesRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

export const ParagraphBlockTitle = memo(() => {
  return (
    <div className={styles.root}>
      <NotesRounded color="secondary" fontSize="medium" />
      <Typography variant="text">Текст (абзац)</Typography>
    </div>
  );
});
