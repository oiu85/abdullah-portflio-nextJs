import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a Supabase client for use at build time (no cookies)
// This is used by generateStaticParams and other build-time functions
export function createBuildClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
