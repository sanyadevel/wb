import { ShortTextRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const StringBlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <ShortTextRounded color="secondary" fontSize="medium" />
      <Typography variant="text">Текст (строка)</Typography>
    </BlockTitleWrapper>
  );
});
