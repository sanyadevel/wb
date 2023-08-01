import { FormHelperText } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';

type Props = {};

export const HelpText = memo(({ children }: PropsWithChildren<Props>) => {
  return (
    <FormHelperText
      sx={theme => ({
        /* color: theme.palette.additional.helpText  todo */
      })}
      variant="filled"
    >
      {children}
    </FormHelperText>
  );
});
