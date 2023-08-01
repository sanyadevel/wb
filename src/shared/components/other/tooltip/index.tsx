import { memo } from 'react';
import { Tooltip as MuiTooltip, TooltipProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Tooltip = memo(({ children, sx, ...restProps }: TooltipProps) => {
  const theme = useTheme();

  const defaultSx: TooltipProps['sx'] = {
    '& .MuiTooltip-tooltip': {
      backgroundColor: theme.palette.code.border,
      color: theme.palette.common.white,
      fontSize: 12,
    },
    '& .MuiTooltip-arrow': {
      color: theme.palette.code.border,
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiTooltip
      componentsProps={{ popper: { sx: newSx } }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children}
    </MuiTooltip>
  );
});
