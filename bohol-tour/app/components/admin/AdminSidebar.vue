<template>
  <!-- Fixed sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 w-60 bg-slate-950 flex flex-col transition-transform duration-300 ease-in-out"
    :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- Logo -->
    <div class="px-5 h-14 flex items-center border-b border-slate-800/60 shrink-0">
      <NuxtLink to="/" class="flex items-center gap-2.5 group" @click="$emit('close')">
        <div class="w-7 h-7 bg-ocean-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-ocean-500 transition-colors">
          <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <div>
          <div class="font-bold text-white text-sm leading-tight tracking-tight">BoholTours</div>
          <div class="text-slate-500 text-[10px] tracking-wide uppercase">Admin Panel</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <!-- Main section -->
      <div class="px-2 pb-2">
        <span class="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Main</span>
      </div>

      <NuxtLink
        v-for="item in mainNavItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative"
        :class="isActive(item.to)
          ? 'text-white bg-slate-800/70'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'"
        @click="$emit('close')"
      >
        <!-- Active left border indicator -->
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-200"
          :class="isActive(item.to) ? 'h-5 bg-ocean-500' : 'h-0'"
        />

        <svg
          class="w-4 h-4 shrink-0 transition-colors"
          :class="isActive(item.to) ? 'text-ocean-400' : 'text-slate-500 group-hover:text-slate-300'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="item.icon" />
        </svg>

        <span class="flex-1">{{ item.label }}</span>

        <span
          v-if="item.badge"
          class="text-[10px] font-bold bg-ocean-600/25 text-ocean-400 px-1.5 py-0.5 rounded-full leading-none"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>

      <!-- Settings section -->
      <div class="px-2 pt-5 pb-2">
        <span class="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Settings</span>
      </div>

      <a
        href="/"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all group"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        View Website
        <svg class="w-3 h-3 ml-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </nav>

    <!-- User footer -->
    <div class="px-3 py-3 border-t border-slate-800/60 shrink-0">
      <div class="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-800/40 transition-colors cursor-default">
        <div class="w-7 h-7 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
          {{ userInitial }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-slate-200 text-xs font-medium truncate">{{ user?.email }}</div>
          <div class="flex items-center gap-1 mt-0.5">
            <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span class="text-slate-500 text-[10px]">Administrator</span>
          </div>
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

const mainNavItems = [
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
