import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from 'db';
import { env } from '../../src/env.mjs';

export default async function Index(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const client = createServerClient<Database>(
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

  const apps = await client.from('App').select('*');
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <div>
      You are authenticated as: <code>{user?.email}</code>
      <p>You currently have {apps.data?.length} apps.</p>
    </div>
  );
}
