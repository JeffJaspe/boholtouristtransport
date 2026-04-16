<template>
  <div class="min-h-screen flex">
    <!-- Left brand panel -->
    <div class="hidden lg:flex lg:w-[45%] xl:w-1/2 bg-slate-950 relative overflow-hidden flex-col">
      <!-- Dot grid -->
      <div
        class="absolute inset-0 opacity-[0.04]"
        style="background-image: radial-gradient(circle at 1px 1px, white 1.5px, transparent 0); background-size: 28px 28px;"
      />

      <!-- Gradient orbs -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-ocean-600/20 rounded-full blur-3xl" />
      <div class="absolute bottom-1/3 right-0 w-72 h-72 bg-teal-600/15 rounded-full blur-3xl" />

      <div class="relative flex-1 flex flex-col justify-between p-10 xl:p-14">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-ocean-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div>
            <div class="text-white font-bold text-sm leading-tight">BoholTours</div>
            <div class="text-slate-500 text-[10px] uppercase tracking-wide">Admin Panel</div>
          </div>
        </div>

        <!-- Center content -->
        <div>
          <h2 class="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Manage your<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-ocean-400 to-teal-400">
              island tours
            </span>
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
            Everything you need to run your Bohol tourism business — from creating tours to managing guest bookings.
          </p>

          <!-- Feature list -->
          <ul class="space-y-3">
            <li v-for="feature in features" :key="feature" class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-ocean-600/20 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-sm text-slate-400">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xs text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to website
          </NuxtLink>
          <span class="text-xs text-slate-700">Bohol, Philippines</span>
        </div>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="flex-1 flex flex-col bg-slate-50">
      <!-- Mobile header -->
      <div class="lg:hidden px-6 py-5 flex items-center gap-3 border-b border-slate-200 bg-white">
        <div class="w-7 h-7 bg-ocean-600 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <span class="font-bold text-slate-900 text-sm">BoholTours Admin</span>
      </div>

      <div class="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div class="w-full max-w-sm">
          <!-- Heading -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-slate-900">Sign in</h1>
            <p class="text-slate-500 text-sm mt-1">Enter your credentials to access the dashboard</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-4" novalidate>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="admin@bohol-tours.ph"
                autocomplete="email"
                required
                class="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
                :class="error ? 'border-red-300' : 'border-slate-200'"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
              </div>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPass ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
                  class="w-full px-3.5 py-2.5 pr-10 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
                  :class="error ? 'border-red-300' : 'border-slate-200'"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  @click="showPass = !showPass"
                >
                  <svg v-if="!showPass" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error -->
            <div
              v-if="error"
              class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {{ error }}
            </div>

            <!-- Demo notice -->
            <div class="bg-ocean-50 border border-ocean-100 rounded-xl p-3 text-xs text-ocean-700">
              <strong class="font-semibold">Demo mode:</strong> Configure your Supabase credentials to enable real auth. Or use the shortcut below.
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>

            <button
              type="button"
              class="w-full py-2.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 bg-white rounded-xl transition-colors font-medium"
              @click="demoAccess"
            >
              Continue with demo access →
            </button>
          </form>

          <!-- Mobile back link -->
          <p class="lg:hidden text-center mt-8">
            <NuxtLink to="/" class="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Back to website</NuxtLink>
          </p>
        </div>
      </div>
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

const features = [
  'Create and manage tour packages',
  'Track and update guest bookings',
  'Control tour visibility and pricing',
  'Real-time booking notifications',
]

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

const demoAccess = () => {
  user.value = { id: 'demo', email: 'demo@bohol-tours.ph' }
  navigateTo('/admin')
}
</script>
