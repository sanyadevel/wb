/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, PropsWithChildren } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider, SnackbarOrigin, SnackbarProviderProps } from 'notistack';
import { MAX_SNACK_COUNT } from './constants';
import { CreateSnackbar } from './components';

const anchorOrigin: SnackbarOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};

export const providerProps: SnackbarProviderProps = {
  anchorOrigin,
  maxSnack: MAX_SNACK_COUNT,
  Components: {
    success: CreateSnackbar('success'),
    error: CreateSnackbar('error'),
    info: CreateSnackbar('info'),
    warning: CreateSnackbar('warning'),
    default: CreateSnackbar('default'),
  },
};

export const SnackbarProvider = memo(({ children }: PropsWithChildren) => {
  return <NotistackSnackbarProvider {...providerProps}>{children}</NotistackSnackbarProvider>;
});
