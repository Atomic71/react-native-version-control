'use client';

import type { PropsWithChildren } from 'react';
import { useGetAppVersions } from '../hooks/queries/use-get-app-versions';
import VersionCard from './version-card';

export default function AppVersionsOverview({
  id,
}: PropsWithChildren<{
  id: number;
}>): JSX.Element {
  const query = useGetAppVersions(id);
  const versions = query.data?.data;

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h1>App versions</h1>
      </div>
      <div>
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
