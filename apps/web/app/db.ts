import { makeSupabaseClient } from 'db';
import { env } from '../src/env.mjs'; // On server

export const client = makeSupabaseClient(
  env.NEXT_SUPABASE_URL,
  env.NEXT_SUPABASE_ANON_KEY
);
