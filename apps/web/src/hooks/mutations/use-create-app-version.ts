import { useMutation } from '@tanstack/react-query';
import type { CreateAppVersionPayload } from 'db';
import { browserClient } from '../../db/supabase';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useCreateVersion = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (payload: CreateAppVersionPayload) => {
      const data = await browserClient.from('app_versions').insert(payload);
      return data;
    },
    onSuccess,
  });
};
