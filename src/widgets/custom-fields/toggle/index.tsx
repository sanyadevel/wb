import { ToggleOffTwoTone, ToggleOnTwoTone } from '@mui/icons-material';
import { Checkbox, CheckboxProps } from '@mui/material';
import React, { memo } from 'react';

type Props = CheckboxProps;

export const Toggle = memo((props: Props) => {
  return (
    <Checkbox
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      checkedIcon={<ToggleOnTwoTone />}
      icon={<ToggleOffTwoTone color="secondary" />}
      sx={{ padding: '0px' }}
    />
  );
});
