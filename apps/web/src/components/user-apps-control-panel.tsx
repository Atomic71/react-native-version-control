'use client';

import { useQuery } from '@tanstack/react-query';
import { browserClient } from '../db/supabase';

export default function UserAppsControlPanel(): JSX.Element {
  const query = useQuery({
    queryKey: ['apps'],
    queryFn: async () => {
      const data = await browserClient.from('apps').select();
      return data;
    },
    staleTime: 1000 * 5 * 60,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {Boolean(query.isLoading) && <p>Loading...</p>}
      {Boolean(query.data?.count) && <p>You currently have {} apps.</p>}
    </div>
  );
}
