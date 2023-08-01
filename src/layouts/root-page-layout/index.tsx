import React, { PropsWithChildren, memo } from 'react';
import { QueryErrorBoundary } from 'src/widgets';
import { SuspenseWithFallback } from 'src/shared/components';
import { RootLayout } from '../root-layout';
import { RootHeader } from '../root-header';

type Props = {};

export const RootPageLayout = memo(({ children }: PropsWithChildren<Props>) => {
  return (
    <RootLayout>
      <RootHeader />
      <QueryErrorBoundary>
        <SuspenseWithFallback>{children}</SuspenseWithFallback>
      </QueryErrorBoundary>
    </RootLayout>
  );
});
