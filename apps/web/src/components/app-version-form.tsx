import { Button, Input } from '@supabase/ui';
import React, { type PropsWithChildren, useState, useEffect } from 'react';
import type { Enums, Tables } from 'db';
import type { CreateAppVersionPayload } from '../hooks/mutations/use-create-app-version';
import Radio from './core/radio';
import Checkbox from './core/checkbox';

type AppOsType = Enums<'AppOS'>;

const appOsOptions = [
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
];

export default function AppVersionForm({
  onSubmit,
  version,
  disabled = false,
  loading = false,
}: PropsWithChildren<{
  onSubmit: (
    payload: Pick<
      CreateAppVersionPayload,
      'app_os' | 'is_blocked' | 'is_latest' | 'version_number'
    >
  ) => void;
  version?: Tables<'app_versions'>;
  disabled: boolean;
  loading: boolean;
}>): JSX.Element {
  const [name, setName] = useState<string>('');
  const [appOs, setAppOs] = useState<AppOsType>('Android');
  const [isLatest, setIsLatest] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (version) {
      setName(version.version_number);
      setAppOs(version.app_os);
      setIsLatest(version.is_latest);
      setIsBlocked(version.is_blocked);
    }
  }, [version]);

  return (
    <div className='flex justify-between flex-col'>
      <div className='flex-1'>
        <div className='mb-3'>
          <Input
            label='Version code'
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div>
          <p>App OS</p>
          {appOsOptions.map((item) => (
            <Radio
              checked={appOs === item.value}
              key={item.value}
              label={item.label}
              name='appOs'
              onChange={(value) => {
                setAppOs(value as AppOsType);
              }}
              value={item.value as AppOsType}
            />
          ))}
        </div>
        <Checkbox
          checked={isLatest}
          label='Is latest version'
          onChange={() => {
            setIsLatest(!isLatest);
          }}
        />
        <Checkbox
          checked={isBlocked}
          label='Is blocked'
          onChange={() => {
            setIsBlocked(!isBlocked);
          }}
        />
      </div>

      <div className='ml-auto mt-auto'>
        <Button
          disabled={disabled}
          loading={loading}
          onClick={() => {
            onSubmit({
              version_number: name,
              app_os: appOs,
              is_blocked: isBlocked,
              is_latest: isLatest,
            });
          }}
        >
          {version ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  );
}
