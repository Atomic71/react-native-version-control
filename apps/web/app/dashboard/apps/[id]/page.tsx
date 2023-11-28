'use client';

import { Button } from '@supabase/ui';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useRef } from 'react';
import { useGetUserApp } from '../../../../src/hooks/queries/use-get-user-app';
import { useDeleteApp } from '../../../../src/hooks/mutations/use-delete-app';
import { keys } from '../../../../src/hooks/queries/keys';
import AppVersionForm from '../../../../src/components/app-version-form';
import { useCreateVersion } from '../../../../src/hooks/mutations/use-create-app-version';

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const query = useGetUserApp(params.id);
  const queryClient = useQueryClient();
  const deleteApp = useDeleteApp({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [keys.apps],
      });
    },
  });

  const createVersion = useCreateVersion({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [keys.apps],
      });
    },
  });
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (!query.data?.data?.length) {
    return redirect('/dashboard/');
  }

  const app = query.data.data[0];

  return (
    <div>
      <div className='flex justify-between mb-5'>
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
      <Button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Create new version
      </Button>
      <dialog
        className='w-1/2 h-1/2 p-4'
        ref={dialogRef}
      >
        <div className='flex justify-between'>
          <h3>Create new version</h3>
          <Button
            onClick={() => {
              dialogRef.current?.close();
            }}
            type='text'
          >
            Close
          </Button>
        </div>
        <AppVersionForm
          onSubmit={({ name, appOs }) => {
            createVersion.mutate({
              appId: app.id,
              name,
              os: appOs,
            });
          }}
        />
      </dialog>
    </div>
  );
}
