import React from 'react';
import { GlobalErrorBoundary, RouteParamsErrorBoundary } from 'src/widgets';
import { PageBuilder } from '../page-builder';

export const ConnectedPage = () => {


  // TODO: вернуть для все пользователей
  // if (isInit) {
  // return <CircularPreloader />;
  // return null;
  // }

  return (
    <GlobalErrorBoundary>
      <RouteParamsErrorBoundary>
        <PageBuilder />
      </RouteParamsErrorBoundary>
    </GlobalErrorBoundary>
  );
};
