'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { browserClient } from './db/supabase';
import { DialogContextProvider } from './context/ctx-dialog';

// recommended setup: https://tanstack.com/query/v5/docs/react/guides/ssr
const cache = new QueryCache({});
export default function Providers({ children }): JSX.Element {
  // eslint-disable-next-line react/hook-use-state -- don't need the setState
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
        queryCache: cache,
      })
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        cache.clear();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [client]);
  return (
    <QueryClientProvider client={client}>
      <DialogContextProvider>{children}</DialogContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
