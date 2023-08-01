import Filter1Icon from '@mui/icons-material/Filter1';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const BlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <Filter1Icon color="secondary" fontSize="medium" />
      <Typography variant="text">Число</Typography>
    </BlockTitleWrapper>
  );
});
