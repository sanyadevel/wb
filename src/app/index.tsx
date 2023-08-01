import { getBuildVersion, WEB_MANIFEST } from 'src/features';
import { SelfMadeRouterProvider } from 'src/libs';
import { QueryClientProvider } from '@tanstack/react-query';
import 'normalize.css';
import { ConnectedPage } from 'src/libs/router/components';
import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import { SnackbarProvider } from './snackbar-provider';
import { ThemeProvider } from './theme-provider';
import { queryClient } from './query-client';
import { router } from './router-init';
import { IsOffline } from './is-offline';

// eslint-disable-next-line
console.debug('Build version: ', getBuildVersion());

// eslint-disable-next-line
console.debug('WEB_MANIFEST: ', WEB_MANIFEST);

export const App = () => {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SelfMadeRouterProvider router={router}>
              <SnackbarProvider>
                <IsOffline>
                  <ConnectedPage />
                </IsOffline>
              </SnackbarProvider>
            </SelfMadeRouterProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </DndProvider>
    </RecoilRoot>
  );
};
