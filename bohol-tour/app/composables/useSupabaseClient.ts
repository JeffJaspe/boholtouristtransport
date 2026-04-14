import type { SupabaseClient } from '@supabase/supabase-js'

export const useSupabaseClient = (): SupabaseClient | null => {
  const { $supabase } = useNuxtApp()
  return $supabase as SupabaseClient | null
}
