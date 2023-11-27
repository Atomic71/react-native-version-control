'use client';

import { Button } from '@supabase/ui';
import { useCallback } from 'react';
import { useCreateApp } from '../hooks/mutations/use-create-app';
import { useGetUserApps } from '../hooks/queries/use-get-user-apps';

export default function UserAppsControlPanel(): JSX.Element {
  const query = useGetUserApps();

  const { mutate } = useCreateApp({
    onSuccess: () => {
      void query.refetch();
    },
  });

  const execute = useCallback(() => {
    // eslint-disable-next-line no-alert -- will be changed anyways
    const res = prompt('name?');
    if (!res) return;
    mutate({
      name: res,
    });
  }, [mutate]);

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h1>Welcome to your dashboard!</h1>
        <Button onClick={execute}>Create a new app</Button>
      </div>
      <div>
        <h2 className='text-xl mb-4'>Your apps</h2>
        {Boolean(query.data?.data?.length) && (
          <div className='flex gap-4'>
            {query.data?.data?.map((app) => (
              <div
                className='flex flex-col py-3 px-4 rounded-md border border-gray-200 gap-3'
                key={app.id}
              >
                <h3>App name: {app.name}</h3>
                <Button>Manage</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
