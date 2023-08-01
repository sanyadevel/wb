import { ButtonBaseProps, ButtonBase as MuiButtonBase, useTheme } from '@mui/material';
import React, { memo } from 'react';
import { merge } from 'lodash';

type Props = ButtonBaseProps;

export const ButtonBase = memo(({ disableRipple, sx, ...rest }: Props) => {
  const theme = useTheme();
  const defaultSx: Props['sx'] = {
    color: theme.palette.secondary.main,
    '& :hover': { color: theme.palette.primary.main },
  };
  const newSx = merge(defaultSx, sx);

  return (
    <MuiButtonBase
      disableRipple
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={newSx}
    />
  );
});
