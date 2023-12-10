'use client';

import type { PropsWithChildren } from 'react';
import type { AppVersion } from 'db';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useGetAppVersions } from '../hooks/queries/use-get-app-versions';
import VersionCard from './version-card';
import Table from './core/table';

extend(relativeTime);

export default function AppVersionsOverview({
  id,
}: PropsWithChildren<{
  id: number;
}>): JSX.Element {
  const query = useGetAppVersions(id);
  const versions = query.data?.data;

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (!query.data) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h1>App versions</h1>
      </div>
      <div>
        <Table<AppVersion>
          headers={[
            { key: 'version_number', title: 'Version' },
            {
              key: 'created_at',
              title: 'Created at',
              render: (item) => <span>{dayjs(item.created_at).fromNow()}</span>,
            },
            {
              key: 'updated_at',
              title: 'Updated at',
              render: (item) => <span>{dayjs(item.updated_at).fromNow()}</span>,
            },
          ]}
          items={versions ?? []}
        />
        {versions?.length ? (
          <div className='flex gap-4'>
            {versions.map((version) => (
              <VersionCard
                key={version.id}
                versionInfo={version}
              />
            ))}
          </div>
        ) : (
          <p>You don&apos;t have any app versions yet yet</p>
        )}
      </div>
    </div>
  );
}
