<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- Mobile overlay -->
    <Transition name="fade-overlay">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <AdminSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main content area — offset by sidebar on large screens -->
    <div class="lg:pl-60 min-h-screen flex flex-col">

      <!-- Topbar -->
      <header class="sticky top-0 z-30 h-14 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center px-4 lg:px-6 gap-3">

        <!-- Mobile hamburger -->
        <button
          class="lg:hidden p-2 -ml-1 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          @click="sidebarOpen = !sidebarOpen"
          aria-label="Toggle sidebar"
        >
          <svg v-if="!sidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-1 text-sm flex-1 min-w-0" aria-label="Breadcrumb">
          <NuxtLink
            to="/admin"
            class="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            :class="{ 'text-slate-700 font-medium': breadcrumbs.length === 1 }"
          >
            Dashboard
          </NuxtLink>
          <template v-for="(crumb, i) in breadcrumbs.slice(1)" :key="crumb.label">
            <svg class="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <NuxtLink
              v-if="crumb.to && i < breadcrumbs.slice(1).length - 1"
              :to="crumb.to"
              class="text-slate-400 hover:text-slate-700 transition-colors truncate"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-slate-800 font-medium truncate">{{ crumb.label }}</span>
          </template>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- View public site -->
          <a
            href="/"
            target="_blank"
            rel="noopener"
            class="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </a>

          <!-- Divider -->
          <div class="hidden sm:block w-px h-5 bg-slate-200" />

          <!-- User dropdown -->
          <div class="relative" ref="userMenuRef">
            <button
              class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
              @click="userMenuOpen = !userMenuOpen"
            >
              <div class="w-7 h-7 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {{ userInitial }}
              </div>
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <Transition name="dropdown">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg shadow-slate-200/80 border border-slate-200/80 py-1 z-50"
              >
                <div class="px-4 py-2.5 border-b border-slate-100">
                  <p class="text-sm font-medium text-slate-800 truncate">{{ user?.email }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">Administrator</p>
                </div>
                <button
                  class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-0.5"
                  @click="handleSignOut"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 sm:p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, signOut } = useAuth()

const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

const userInitial = computed(() => (user.value?.email?.[0] ?? 'A').toUpperCase())

// Close user menu on outside click
onMounted(() => {
  const handler = (e: MouseEvent) => {
    if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) {
      userMenuOpen.value = false
    }
  }
  document.addEventListener('mousedown', handler)
  onUnmounted(() => document.removeEventListener('mousedown', handler))
})

// Close sidebar on route change
watch(() => route.path, () => {
  sidebarOpen.value = false
})

// Breadcrumb computed from route
const breadcrumbs = computed(() => {
  const path = route.path
  const crumbs: { label: string; to?: string }[] = [{ label: 'Dashboard', to: '/admin' }]

  if (path.startsWith('/admin/tours')) {
    crumbs.push({ label: 'Tours', to: '/admin/tours' })
    if (path.endsWith('/new')) crumbs.push({ label: 'New Tour' })
    else if (path.includes('/edit')) crumbs.push({ label: 'Edit Tour' })
  } else if (path.startsWith('/admin/bookings')) {
    crumbs.push({ label: 'Bookings', to: '/admin/bookings' })
  }

  return crumbs
})

const handleSignOut = async () => {
  userMenuOpen.value = false
  await signOut()
  await navigateTo('/admin/login')
}
</script>

<style scoped>
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
