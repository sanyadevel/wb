import { memo } from 'react';
import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material';
import { merge } from 'lodash';

export const LabeledRadio = memo(({ sx, ...restProps }: FormControlLabelProps) => {
  const defaultSx: FormControlLabelProps['sx'] = {
    '& .MuiTypography-root': { fontSize: `13px`, fontWeight: 400 },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <FormControlLabel
      sx={newSx}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      control={<Radio />}
    />
  );
});
