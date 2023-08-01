import { CheckBoxTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const BlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <CheckBoxTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Чекбокс</Typography>
    </BlockTitleWrapper>
  );
});
