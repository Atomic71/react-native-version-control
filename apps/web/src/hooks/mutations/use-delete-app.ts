import { useMutation } from '@tanstack/react-query';
import { browserClient } from '../../db/supabase';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference is better
export const useDeleteApp = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await browserClient.from('apps').delete().eq('id', id);
      return data;
    },
    onSuccess,
  });
};
