import { memo } from 'react';
import { Paper as MuiPaper, PaperProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Paper = memo(({ sx, ...restProps }: PaperProps) => {
  const theme = useTheme();

  const defaultSx: PaperProps['sx'] = {
    '& .MuiPaper-root': { borderRadius: `${theme.properties.borderRadius}px` },
    background: theme.palette.background.paper,
    boxShadow: '0px 4px 8px rgba(97, 97, 97, 0.14), 0px 8px 16px rgba(97, 97, 97, 0.14)',
    padding: '8px',
    borderRadius: '8px',
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiPaper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
