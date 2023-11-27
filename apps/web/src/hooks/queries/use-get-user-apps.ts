import { useQuery } from '@tanstack/react-query';
import { browserClient } from '../../db/supabase';
import { keys } from './keys';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useGetUserApps = () => {
  const query = useQuery({
    queryKey: [keys.apps],
    queryFn: async () => {
      const data = await browserClient
        .from('apps')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      return data;
    },
    staleTime: 1000 * 5 * 60,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
