import { memo } from 'react';
import { Chip as MuiChip, ChipProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Chip = memo(({ sx, size = 'small', ...restProps }: ChipProps) => {
  const theme = useTheme();

  const defaultSx: ChipProps['sx'] = {
    borderRadius: '4px',
    background: theme.palette.chip.background,
    '& .MuiChip-deleteIcon': {
      color: theme.palette.chip.deleteIcon,
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiChip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      size={size}
      sx={newSx}
    />
  );
});
