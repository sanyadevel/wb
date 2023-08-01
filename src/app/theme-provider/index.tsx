import React, { memo, PropsWithChildren } from 'react';
import { defaultTheme } from 'src/theme';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

export const ThemeProvider = memo(({ children }: PropsWithChildren<{}>) => {
  return <CssVarsProvider theme={defaultTheme}>{children}</CssVarsProvider>;
});
