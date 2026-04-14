<template>
  <section id="tours" class="py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Section header ──────────────────────────── -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div class="flex items-center gap-3 mb-4 sr">
            <div class="h-px w-8 bg-gradient-to-r from-ocean-600 to-transparent" />
            <span class="text-ocean-600 text-xs font-bold uppercase tracking-[0.2em]">Our Packages</span>
          </div>
          <h2 class="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-slate-900 leading-tight sr sr-d1">
            Featured<br class="hidden sm:block" /> Adventures
          </h2>
        </div>
        <div class="md:text-right sr sr-d2">
          <p class="text-slate-500 text-base max-w-xs leading-relaxed mb-4">
            Hand-picked by our local experts for the ultimate Bohol experience
          </p>
          <NuxtLink
            to="/tours"
            class="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-semibold text-sm link-underline transition-colors duration-200 group"
          >
            View all tours
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- ── Filter pills ────────────────────────────── -->
      <div class="flex flex-wrap gap-2 mb-10 sr sr-d2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 btn-press"
          :class="activeFilter === filter.value
            ? 'bg-ocean-600 text-white shadow-glow-ocean'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- ── Skeleton ────────────────────────────────── -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- ── Tour grid ───────────────────────────────── -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TourCard
          v-for="(tour, i) in filteredTours"
          :key="tour.id"
          :tour="tour"
          class="sr"
          :class="`sr-d${Math.min(i + 1, 6)}`"
        />
      </div>

      <!-- ── CTA button ──────────────────────────────── -->
      <div class="text-center mt-14 sr">
        <NuxtLink
          to="/tours"
          class="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-ocean-200 text-ocean-700 hover:bg-ocean-600 hover:text-white hover:border-ocean-600 font-semibold transition-all duration-300 btn-press hover:shadow-glow-ocean"
        >
          Explore All Tours
          <div class="w-6 h-6 bg-ocean-100 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'

useScrollReveal()

const { fetchTours } = useTours()
const tours = ref<Tour[]>([])
const loading = ref(true)
const activeFilter = ref('all')

const filters = [
  { label: '🌴 All Tours', value: 'all' },
  { label: '🏝 Full Day', value: 'Full Day' },
  { label: '⛵ Half Day', value: 'Half Day' },
  { label: '🌙 Evening', value: 'Evening' },
]

const filteredTours = computed(() => {
  if (activeFilter.value === 'all') return tours.value
  return tours.value.filter((t) => t.duration.includes(activeFilter.value))
})

onMounted(async () => {
  try {
    const all = await fetchTours(true)
    tours.value = all.slice(0, 6)
  } finally {
    loading.value = false
  }
})
</script>
