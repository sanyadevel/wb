import { useMemo } from 'react';
import { RouteContext } from 'react-router5/dist/types';
import { useRoute } from 'react-router5';
import { INIT_PAGE_LIMIT } from 'src/constants';
import { OrderTypes } from 'src/shared/components/other/table/types';

export type SortType = {
  name: string;
  direction: OrderTypes;
};

export type SortEventType = {
  name: string;
  direction: OrderTypes;
};

export type BasicRouteParams = RouteContext;
export type ExtendedRouteParams = {
  onSetPage: (page: number) => void;
  onSetPerPage: (perPage: number) => void;
  onSearch: (value: string) => void;
  onSort: ({ name, direction }: SortEventType) => void;
  sortParams: SortType;
  page: number;
  limit: number;
  search: string;
};

export type DefaultRouteParams = {
  defaultSortName?: string;
  defaultDirection?: OrderTypes;
  defaultLimit?: number;
  paramsPrefix?: string;
};

export const useRouteParams = (defaultParams: DefaultRouteParams = {}): RouteContext & ExtendedRouteParams => {
  const {
    defaultSortName = '',
    defaultDirection = OrderTypes.ASC,
    paramsPrefix,
    defaultLimit = INIT_PAGE_LIMIT,
  } = defaultParams;
  const {
    router,
    route,
    route: { name: routeName, params },
    previousRoute,
  } = useRoute();

  return useMemo<RouteContext & ExtendedRouteParams>(
    () => {
      const prefix = paramsPrefix ? `${paramsPrefix}-` : '';
      const paramsMap = {
        page: `${prefix}page`,
        limit: `${prefix}limit`,
        sortName: `${prefix}sortName`,
        direction: `${prefix}direction`,
        search: `${prefix}search`,
      };

      return {
        onSetPage: (page: number) => {
          router.navigate(routeName, {
            ...params,
            [paramsMap.page]: page,
          });
        },
        onSetPerPage: (limit: number) => {
          router.navigate(routeName, {
            ...params,
            [paramsMap.limit]: limit,
            [paramsMap.page]: 0,
          });
        },
        onSort: ({ name, direction }: SortEventType) => {
          router.navigate(routeName, {
            ...params,
            [paramsMap.sortName]: name,
            [paramsMap.direction]: direction,
          });
        },
        onSearch: (value: string) => {
          if (value.length > 0) {
            const routeParams = {
              ...params,
              [paramsMap.search]: value,
            };
            router.navigate(routeName, routeParams);
          } else {
            const { [paramsMap.search]: search, ...croppedParams } = params;
            router.navigate(routeName, croppedParams);
          }
        },
        sortParams: {
          name: params[paramsMap.sortName] || defaultSortName,
          direction: params[paramsMap.direction] || defaultDirection,
        },
        limit: Number(params[paramsMap.limit]) || defaultLimit,
        page: Number(params[paramsMap.page]) || 0,
        search: params[paramsMap.search] || '',
        router,
        route,
        previousRoute,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultParams, params, routeName, router],
  );
};
