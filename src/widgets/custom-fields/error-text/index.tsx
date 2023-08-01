import { FormHelperText } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';

type Props = {};

export const ErrorText = memo(({ children }: PropsWithChildren<Props>) => {
  return (
    <FormHelperText error variant="filled">
      {children}
    </FormHelperText>
  );
});
