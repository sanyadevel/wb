import { RadioButtonUncheckedTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const SingleChoiceBlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <RadioButtonUncheckedTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Один из списка</Typography>
    </BlockTitleWrapper>
  );
});
