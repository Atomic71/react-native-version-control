import { Button, Input } from '@supabase/ui';
import React, { type PropsWithChildren, useState } from 'react';
import type { Enums } from 'db';

type AppOsType = Enums<'AppOS'>;

export default function AppVersionForm({
  onSubmit,
}: PropsWithChildren<{
  onSubmit: ({ name, appOs }: { name: string; appOs: AppOsType }) => void;
}>): JSX.Element {
  const [name, setName] = useState<string>('');
  const [appOs, setAppOs] = useState<AppOsType>('Android');

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
          <div className='flex gap-2'>
            <input
              checked={appOs === 'Android'}
              name='appOs'
              onChange={(e) => {
                setAppOs(e.target.value as AppOsType);
              }}
              type='radio'
              value={'Android' as AppOsType}
            />
            <label htmlFor='android'>Android</label>
          </div>
          <div className='flex gap-2'>
            <input
              checked={appOs === 'Android'}
              name='appOs'
              onChange={(e) => {
                setAppOs(e.target.value as AppOsType);
              }}
              type='radio'
              value={'iOS' as AppOsType}
            />
            <label htmlFor='iOS'>iOS</label>
          </div>
        </div>
      </div>

      <div className='ml-auto mt-auto'>
        <Button
          onClick={() => {
            onSubmit({ name, appOs });
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
