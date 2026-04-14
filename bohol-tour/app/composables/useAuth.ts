export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useState<null | { email: string; id: string }>('auth_user', () => null)
  const loading = ref(false)

  const initAuth = async () => {
    if (!supabase) return
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) {
      user.value = { id: data.session.user.id, email: data.session.user.email ?? '' }
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user
        ? { id: session.user.id, email: session.user.email ?? '' }
        : null
    })
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      user.value = data.user ? { id: data.user.id, email: data.user.email ?? '' } : null
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    if (!supabase) {
      user.value = null
      return
    }
    await supabase.auth.signOut()
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)

  return { user, loading, isAuthenticated, initAuth, signIn, signOut }
}
