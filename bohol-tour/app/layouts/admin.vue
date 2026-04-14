<template>
  <div class="min-h-screen bg-slate-50 font-sans flex">
    <AdminSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20"
      >
        <button
          class="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex-1 lg:flex-none">
          <h1 class="text-slate-800 font-semibold text-sm hidden lg:block">Admin Dashboard</h1>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-sm text-slate-500 hidden sm:block">{{ user?.email }}</span>
          <button
            class="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            @click="handleSignOut"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, signOut } = useAuth()
const sidebarOpen = ref(false)

const handleSignOut = async () => {
  await signOut()
  await navigateTo('/admin/login')
}
</script>
