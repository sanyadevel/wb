import React from 'react';
import { SuspenseWithFallback } from 'src/shared/components';

const PageView = React.lazy(() => import('./_components/page-view'));

const Page = () => {
  return (
    <SuspenseWithFallback>
      <PageView />
    </SuspenseWithFallback>
  );
};

export default Page;
