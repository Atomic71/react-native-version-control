import { useQuery } from '@tanstack/react-query';
import type { App } from 'db';
import { browserClient } from '../../db/supabase';
import { keys } from './keys';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useGetAppVersions = (id: App['id']) => {
  const query = useQuery({
    queryKey: [
      keys.app_versions,
      {
        appId: String(id),
      },
    ],
    queryFn: async () => {
      const data = await browserClient
        .from('app_versions')
        .select('*', { count: 'exact' })
        .eq('app', id)
        .order('updated_at', { ascending: false });
      return data;
    },
    staleTime: 1000 * 5 * 60,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
