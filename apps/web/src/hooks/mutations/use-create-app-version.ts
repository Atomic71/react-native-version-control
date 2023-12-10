import { useMutation } from '@tanstack/react-query';
import type { Tables } from 'db';
import { browserClient } from '../../db/supabase';

type AppVersion = Tables<'app_versions'>;

export type CreateAppVersionPayload = Pick<
  AppVersion,
  'app_os' | 'app' | 'is_blocked' | 'is_latest' | 'version_number'
>;

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
