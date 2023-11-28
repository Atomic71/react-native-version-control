import { useMutation } from '@tanstack/react-query';
import type { Enums, Tables } from 'db';
import { browserClient } from '../../db/supabase';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useCreateVersion = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async ({
      name,
      os,
      appId,
    }: {
      name: string;
      os: Enums<'AppOS'>;
      appId: Tables<'apps'>['id'];
    }) => {
      const data = await browserClient.from('app_versions').insert({
        version_number: name,
        app_os: os,
        app: appId,
      });
      return data;
    },
    onSuccess,
  });
};
