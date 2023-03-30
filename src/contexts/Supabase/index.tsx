'use client';

import { createContext, useContext, useState } from 'react';
import { getDbClient } from 'services/supabase';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export const SupabaseProvider = ({ children }: BTypes.FCChildren) => {
  const [supabase] = useState(() => getDbClient());

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  } else {
    return context;
  }
};
