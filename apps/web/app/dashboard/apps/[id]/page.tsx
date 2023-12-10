'use client';

import { Button } from '@supabase/ui';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import AppVersionForm from '../../../../src/components/app-version-form';
import AppVersionsOverview from '../../../../src/components/app-versions-overview';
import { useDialogContext } from '../../../../src/context/ctx-dialog';
import { useCreateVersion } from '../../../../src/hooks/mutations/use-create-app-version';
import { useDeleteApp } from '../../../../src/hooks/mutations/use-delete-app';
import { keys } from '../../../../src/hooks/queries/keys';
import { useGetUserApp } from '../../../../src/hooks/queries/use-get-user-app';

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const { setDialogClosed, setDialogOpen } = useDialogContext();
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
      setDialogClosed();
      void queryClient.invalidateQueries({
        queryKey: [keys.apps, params.id],
      });
      void queryClient.invalidateQueries({
        queryKey: [
          keys.app_versions,
          {
            appId: params.id,
          },
        ],
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
      <AppVersionsOverview id={app.id} />
      <Button
        onClick={() => {
          setDialogOpen({
            title: 'Create new version',
            el: (
              <AppVersionForm
                disabled={createVersion.isPending}
                loading={createVersion.isPending}
                onSubmit={(data) => {
                  createVersion.mutate({
                    ...data,
                    app: app.id,
                  });
                }}
              />
            ),
          });
        }}
      >
        Create new version
      </Button>
    </div>
  );
}
