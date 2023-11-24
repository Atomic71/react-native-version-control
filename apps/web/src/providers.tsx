'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// recommended setup: https://tanstack.com/query/v5/docs/react/guides/ssr

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
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
