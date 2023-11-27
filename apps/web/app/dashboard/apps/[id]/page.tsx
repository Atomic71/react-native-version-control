'use client';

import { Button } from '@supabase/ui';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useGetUserApp } from '../../../../src/hooks/queries/use-get-user-app';
import { useDeleteApp } from '../../../../src/hooks/mutations/use-delete-app';
import { keys } from '../../../../src/hooks/queries/keys';

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const query = useGetUserApp(params.id);
  const queryClient = useQueryClient();
  const deleteApp = useDeleteApp({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [keys.apps],
      });
    },
  });
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.data?.data?.length) {
    const app = query.data.data[0];

    return (
      <div className='flex justify-between '>
        <h2 className='text-2xl'>App name: {app.name}</h2>
        <Button
          onClick={() => {
            deleteApp.mutate(app.id);
          }}
          type='text'
        >
          Delete
        </Button>
      </div>
    );
  }
  return redirect('/dashboard/');
}
