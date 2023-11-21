'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';
import { type ReactElement } from 'react';
import { env } from '../env.mjs';

const client = createBrowserClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function UserAuth(): ReactElement {
  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      dark
      providers={[]}
      redirectTo='/dashboard'
      supabaseClient={client}
      view='sign_in'
    />
  );
}

export default UserAuth;
