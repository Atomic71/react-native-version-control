import { Button } from '@supabase/ui';
import { type Tables } from 'db';
import Link from 'next/link';
import React, { type PropsWithChildren } from 'react';

export default function VersionCard({
  versionInfo,
}: PropsWithChildren<{
  versionInfo: Tables<'app_versions'>;
}>): JSX.Element {
  return (
    <div
      className='flex flex-col py-3 px-4 rounded-md border border-gray-200 gap-3'
      key={versionInfo.id}
    >
      <h3>Version: {versionInfo.version_number}</h3>
      <Link
        href={`/dashboard/apps/${versionInfo.app}/version/${versionInfo.id}`}
      >
        <p>
          Blocked:
          <span>{versionInfo.is_blocked ? '✅' : '❌'}</span>
        </p>
        <p>
          Latest:
          <span>{versionInfo.is_latest ? '✅' : '❌'}</span>
        </p>
        <Button>Manage</Button>
      </Link>
    </div>
  );
}
