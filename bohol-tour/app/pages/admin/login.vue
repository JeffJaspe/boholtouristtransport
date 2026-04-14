<template>
  <div class="min-h-screen bg-gradient-to-br from-ocean-950 via-ocean-900 to-teal-900 flex items-center justify-center p-4">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10"
      style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px;"
    />

    <div class="relative w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 bg-ocean-600 rounded-2xl shadow-lg mb-4">
          <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white mb-1">BoholTours Admin</h1>
        <p class="text-ocean-300 text-sm">Sign in to manage your tours and bookings</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-4" novalidate>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@bohol-tours.ph"
              autocomplete="email"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
              :class="{ 'border-red-400': error }"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition pr-10"
                :class="{ 'border-red-400': error }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                @click="showPass = !showPass"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="error"
            class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ error }}
          </div>

          <!-- Demo note -->
          <div class="bg-ocean-50 border border-ocean-100 rounded-xl p-3 text-xs text-ocean-700">
            <strong>Demo:</strong> Configure Supabase to enable login. Without it, use the direct link below.
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>

          <!-- Demo bypass (development only) -->
          <button
            type="button"
            class="w-full py-2.5 text-sm text-ocean-600 hover:text-ocean-700 font-medium hover:underline"
            @click="demoAccess"
          >
            Demo access (skip auth) →
          </button>
        </form>
      </div>

      <p class="text-center text-ocean-400 text-xs mt-6">
        <NuxtLink to="/" class="hover:text-white transition-colors">← Back to website</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'admin' })

const { signIn, user } = useAuth()
const email = ref('')
const password = ref('')
const showPass = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
    await navigateTo('/admin')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}

// Development-only demo bypass
const demoAccess = () => {
  user.value = { id: 'demo', email: 'demo@bohol-tours.ph' }
  navigateTo('/admin')
}
</script>
