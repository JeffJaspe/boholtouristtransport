<template>
  <aside
    class="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen sticky top-0"
    :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- Logo -->
    <div class="px-6 py-5 border-b border-slate-800">
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 bg-ocean-600 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div>
          <div class="font-bold text-white text-sm leading-tight">BoholTours</div>
          <div class="text-slate-500 text-xs">Admin Panel</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-5 space-y-1">
      <div class="px-3 mb-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main</span>
      </div>

      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group"
        :class="isActive(item.to)
          ? 'bg-ocean-600 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        @click="$emit('close')"
      >
        <svg
          class="w-4 h-4 shrink-0"
          :class="isActive(item.to) ? 'text-white' : 'text-slate-500 group-hover:text-white'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
        </svg>
        {{ item.label }}
        <span
          v-if="item.badge"
          class="ml-auto text-xs font-bold bg-ocean-500/30 text-ocean-300 px-2 py-0.5 rounded-full"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>

      <div class="px-3 mt-6 mb-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</span>
      </div>

      <NuxtLink
        to="/"
        target="_blank"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        View Website
      </NuxtLink>
    </nav>

    <!-- User info -->
    <div class="px-4 py-4 border-t border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-ocean-600/30 rounded-full flex items-center justify-center text-ocean-400 font-bold text-xs">
          {{ userInitial }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white text-sm font-medium truncate">{{ user?.email }}</div>
          <div class="text-slate-500 text-xs">Administrator</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()

defineEmits<{ close: [] }>()
defineProps<{ open?: boolean }>()

const userInitial = computed(() => (user.value?.email?.[0] ?? 'A').toUpperCase())

const isActive = (path: string) =>
  path === '/admin' ? route.path === '/admin' : route.path.startsWith(path)

const navItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    label: 'Tours',
    to: '/admin/tours',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
  {
    label: 'Bookings',
    to: '/admin/bookings',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
]
</script>
