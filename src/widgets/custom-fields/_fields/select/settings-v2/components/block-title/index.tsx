import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { ArrowDropDownCircleIcon } from 'src/shared/components';
import { BlockTitleWrapper } from '../../../../_components';

export const BlockTitle = memo(() => {
  return (
    <BlockTitleWrapper>
      <ArrowDropDownCircleIcon color="secondary" fontSize="medium" />
      <Typography variant="text">Раскрывающийся список</Typography>
    </BlockTitleWrapper>
  );
});
