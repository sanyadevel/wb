import React from 'react';
import { SuspenseWithFallback } from 'src/shared/components';
import { RootLayout, RootHeader } from 'src/layouts';
import { QueryErrorBoundary } from 'src/widgets';

const PageView = React.lazy(() => import('./_components/page-view'));

export const Page = () => {
  return (
    <RootLayout>
      <RootHeader>
      </RootHeader>
      <QueryErrorBoundary>
        <SuspenseWithFallback>
          <PageView />
        </SuspenseWithFallback>
      </QueryErrorBoundary>
    </RootLayout>
  );
};

export default Page;
