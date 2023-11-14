import { createClient } from '@supabase/supabase-js';
import { Database } from './index.types';

export const makeSupabaseClient = (url: string, anonKey: string) =>
  createClient<Database>(url, anonKey);
