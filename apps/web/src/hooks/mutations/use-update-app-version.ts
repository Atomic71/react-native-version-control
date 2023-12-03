import { useMutation } from '@tanstack/react-query';
import type { Tables } from 'db';
import { browserClient } from '../../db/supabase';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useUpdateVersion = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async ({
      name,
      versionId,
      isBlocked,
      isLatest,
    }: {
      name: string;
      versionId: Tables<'app_versions'>['id'];
      isBlocked: boolean;
      isLatest: boolean;
    }) => {
      const data = await browserClient
        .from('app_versions')
        .update({
          version_number: name,
          is_blocked: isBlocked,
          is_latest: isLatest,
        })
        .eq('id', versionId);
      return data;
    },
    onSuccess,
  });
};
