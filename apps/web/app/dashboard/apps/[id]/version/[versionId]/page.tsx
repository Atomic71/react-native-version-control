'use client';

import AppVersionForm from '../../../../../../src/components/app-version-form';
import { useUpdateVersion } from '../../../../../../src/hooks/mutations/use-update-app-version';
import { useGetAppVersion } from '../../../../../../src/hooks/queries/use-get-app-version';

export default function Page({
  params,
}: {
  params: { versionId: string };
}): JSX.Element {
  const queryData = useGetAppVersion(Number(params.versionId));
  const updateMutation = useUpdateVersion({
    onSuccess: () => {
      void queryData.refetch();
    },
  });

  const isLoading = queryData.isLoading;
  const versionInfo = queryData.data?.data?.[0];

  if (isLoading) return <div>Loading...</div>;
  if (!versionInfo) return <div>Not found</div>;

  return (
    <div>
      <AppVersionForm
        disabled={updateMutation.isPending}
        loading={updateMutation.isPending}
        onSubmit={(vals) => {
          updateMutation.mutate({
            ...vals,
            id: versionInfo.id,
          });
        }}
        version={versionInfo}
      />
    </div>
  );
}
