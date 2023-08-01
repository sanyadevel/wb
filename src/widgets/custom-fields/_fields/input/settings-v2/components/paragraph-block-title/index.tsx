import { NotesRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const ParagraphBlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <NotesRounded color="secondary" fontSize="medium" />
      <Typography variant="text">Текст (абзац)</Typography>
    </BlockTitleWrapper>
  );
});
