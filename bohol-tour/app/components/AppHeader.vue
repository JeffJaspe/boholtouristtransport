<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_-4px_rgba(0,0,0,0.08)]' : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group" aria-label="BoholTours home">
        <div
          class="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110"
          :class="scrolled ? 'bg-ocean-600' : 'glass'"
        >
          <!-- Inner shine -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <svg class="relative w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <span
          class="font-bold text-[1.1rem] leading-none tracking-tight transition-colors duration-300"
          :class="scrolled ? 'text-slate-900' : 'text-white'"
        >
          Bohol<span :class="scrolled ? 'text-ocean-600' : 'text-sand-300'">Tours</span>
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-0.5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 group"
          :class="[
            scrolled ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80' : 'text-white/80 hover:text-white hover:bg-white/10',
            isActive(link.to) && scrolled ? 'text-ocean-600' : '',
            isActive(link.to) && !scrolled ? 'text-white' : '',
          ]"
        >
          {{ link.label }}
          <!-- Animated underline -->
          <span
            class="absolute bottom-1 left-4 right-4 h-0.5 rounded-full transition-all duration-300 origin-left"
            :class="[
              isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              scrolled ? 'bg-ocean-600' : 'bg-white',
            ]"
          />
        </NuxtLink>
      </div>

      <!-- CTA + actions -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Phone pill -->
        <a
          href="tel:+6338412000"
          class="hidden lg:flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
          :class="scrolled ? 'text-slate-500 hover:text-ocean-600' : 'text-white/60 hover:text-white'"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +63 38 412 0000
        </a>

        <!-- Divider -->
        <div class="w-px h-4 bg-current opacity-10 hidden lg:block" />

        <!-- Book CTA -->
        <NuxtLink
          to="/tours"
          class="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden btn-press"
          :class="scrolled
            ? 'bg-ocean-600 text-white hover:bg-ocean-700 shadow-sm hover:shadow-glow-ocean'
            : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-ocean-700'"
        >
          Book Now
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 btn-press"
        :class="scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <svg class="w-5 h-5 transition-all duration-300" :class="mobileOpen ? 'opacity-0 rotate-90 scale-75' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg class="absolute w-5 h-5 transition-all duration-300" :class="mobileOpen ? '' : 'opacity-0 -rotate-90 scale-75'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- ── Mobile menu ────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-spring overflow-hidden"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-all duration-200 ease-in overflow-hidden"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="mobileOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100/80 shadow-xl">
        <div class="max-w-7xl mx-auto px-4 py-5 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-ocean-600 hover:bg-ocean-50 transition-all duration-150"
            :class="{ 'text-ocean-600 bg-ocean-50/60 font-semibold': isActive(link.to) }"
            @click="mobileOpen = false"
          >
            <span
              class="w-1.5 h-1.5 rounded-full transition-colors duration-150"
              :class="isActive(link.to) ? 'bg-ocean-600' : 'bg-slate-200'"
            />
            {{ link.label }}
          </NuxtLink>

          <div class="pt-3 border-t border-slate-100">
            <NuxtLink
              to="/tours"
              class="flex items-center justify-center gap-2 w-full py-3.5 bg-ocean-600 text-white rounded-xl text-sm font-bold hover:bg-ocean-700 transition-colors btn-press shadow-glow-ocean"
              @click="mobileOpen = false"
            >
              Book Your Adventure
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tours', to: '/tours' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to.split('#')[0]) && to !== '/'

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 32
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>
