import type { Database } from 'db';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { env } from '../env.mjs';

export const browserClient = createBrowserClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const makeServerClient = (cookieStore: ReadonlyRequestCookies) =>
  createServerClient<Database>(
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
