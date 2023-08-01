import React, { PropsWithChildren, memo } from 'react';
import { QueryErrorBoundary, MainHeader } from 'src/widgets';
import { SuspenseWithFallback } from 'src/shared/components';
import { RootLayout } from '../root-layout';

type Props = {};

export const DashboardPageLayout = memo(({ children }: PropsWithChildren<Props>) => {
  return (
    <RootLayout>
      <MainHeader />
      <QueryErrorBoundary>
        <SuspenseWithFallback>{children}</SuspenseWithFallback>
      </QueryErrorBoundary>
    </RootLayout>
  );
});
