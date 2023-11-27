'use client';

import { useGetUserApp } from '../../../../src/hooks/queries/use-get-user-app';

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const query = useGetUserApp(params.id);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.data?.data) {
    const app = query.data.data[0];
    return (
      <div>
        <h2 className='text-2xl'>App name: {app.name}</h2>
      </div>
    );
  }
  // todo: figure out how to handle cases like this
  return null as unknown as JSX.Element;
}
