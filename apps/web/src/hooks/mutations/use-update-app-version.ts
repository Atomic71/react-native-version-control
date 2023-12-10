import { useMutation } from '@tanstack/react-query';
import type { UpdateAppVersionPayload } from 'db';
import { browserClient } from '../../db/supabase';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useUpdateVersion = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async ({ id, ...update }: UpdateAppVersionPayload) => {
      const data = await browserClient
        .from('app_versions')
        .update(update)
        .eq('id', id);
      return data;
    },
    onSuccess,
  });
};
