import { useMutation } from '@tanstack/react-query';
import { browserClient } from '../../db/supabase';

export const useCreateApp = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const data = await browserClient.from('apps').insert({
        name,
      });
      return data;
    },
    onSuccess,
  });
};
