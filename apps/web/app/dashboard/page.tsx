import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '../../src/env.mjs';

export default async function Index(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const client = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await client.auth.getUser();

  return <div>{user?.email}</div>;
}
