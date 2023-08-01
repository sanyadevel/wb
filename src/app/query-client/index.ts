import { QueryClient } from '@tanstack/react-query';

const handler = (err: unknown) => {
  // TODO
  console.error('Handle error');
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
      onError: handler,
    },
    mutations: { onError: handler },
  },
});
