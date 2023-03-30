'use client';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabase } from 'contexts/Supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthUI = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user.user_metadata.roles.includes('admin'))
        router.push('/admin/dash');
      else if (event === 'SIGNED_IN') {
        router.push('/');
        // cookies.remove(null, 'supabase-auth-token');
      }
    });
  }, [router, supabase.auth]);

  return (
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} showLinks={false}>
      {invalidCredentials ? 'Invalid admin credentials' : ''}
    </Auth>
  );
};
