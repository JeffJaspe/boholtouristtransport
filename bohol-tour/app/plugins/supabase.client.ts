import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseAnonKey = config.public.supabaseAnonKey as string

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Running in demo mode.')
    return { provide: { supabase: null } }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  return {
    provide: { supabase },
  }
})
