import { useQuery } from '@tanstack/react-query';
import { browserClient } from '../../db/supabase';
import { keys } from './keys';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useGetUserApp = (id: string) => {
  const query = useQuery({
    queryKey: [keys.apps, id],
    queryFn: async () => {
      const data = await browserClient
        .from('apps')
        .select('*', { count: 'exact' })
        .eq('id', id);

      return data;
    },
    staleTime: 1000 * 5 * 60,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
