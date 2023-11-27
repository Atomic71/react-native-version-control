'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactElement } from 'react';
import { browserClient } from '../db/supabase';

function UserAuth(): ReactElement {
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/dashboard');
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);
  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      dark
      providers={[]}
      redirectTo='dashboard'
      supabaseClient={browserClient}
      view='sign_in'
    />
  );
}

export default UserAuth;
