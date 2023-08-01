import { CheckBoxOutlineBlankTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { BlockTitleWrapper } from '../../../../_components';

export const MultiChoiceBlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <CheckBoxOutlineBlankTwoTone color="secondary" fontSize="medium" />
      <Typography variant="text">Несколько из списка</Typography>
    </BlockTitleWrapper>
  );
});
