import { useQuery } from '@tanstack/react-query';
import type { Tables } from 'db';
import { browserClient } from '../../db/supabase';
import { keys } from './keys';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useGetAppVersion = (versionId: Tables<'app_versions'>['id']) => {
  const query = useQuery({
    queryKey: [keys.app_versions, versionId],
    queryFn: async () => {
      const data = await browserClient
        .from('app_versions')
        .select('*')
        .eq('id', versionId)
        .order('updated_at', { ascending: false });
      return data;
    },
    staleTime: 1000 * 5 * 60,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
