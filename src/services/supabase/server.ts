import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';

export const getDbServer = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
