<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Page hero -->
    <div class="bg-gradient-to-br from-ocean-900 via-ocean-800 to-teal-800 pt-32 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-ocean-300 text-sm font-semibold uppercase tracking-wider mb-3 block">Our Packages</span>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          All Bohol Tours
        </h1>
        <p class="text-ocean-200 text-lg max-w-2xl mx-auto">
          From sunrise Chocolate Hills to sunset island hopping — find the perfect adventure for you
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filter bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-10">
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="search"
            placeholder="Search tours..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
          <select
            v-model="sortBy"
            class="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 shadow-sm"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      <!-- Result count -->
      <p class="text-sm text-slate-500 mb-6">
        Showing <strong class="text-slate-800">{{ filteredTours.length }}</strong> tours
      </p>

      <!-- Skeletons -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredTours.length === 0" class="text-center py-24">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">No tours found</h3>
        <p class="text-slate-500 mb-6">Try a different search term</p>
        <button class="text-ocean-600 font-medium hover:underline" @click="search = ''">
          Clear search
        </button>
      </div>

      <!-- Tours grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TourCard v-for="tour in filteredTours" :key="tour.id" :tour="tour" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'All Tours — Bohol Tourist Transport',
  description: 'Browse all our Bohol tour packages. Island hopping, Chocolate Hills, tarsiers, beaches and more.',
})

const { fetchTours } = useTours()
const tours = ref<Tour[]>([])
const loading = ref(true)
const search = ref('')
const sortBy = ref('default')

onMounted(async () => {
  try {
    tours.value = await fetchTours(true)
  } finally {
    loading.value = false
  }
})

const filteredTours = computed(() => {
  let result = tours.value

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    )
  }

  switch (sortBy.value) {
    case 'price_asc':
      return [...result].sort((a, b) => a.price - b.price)
    case 'price_desc':
      return [...result].sort((a, b) => b.price - a.price)
    case 'title':
      return [...result].sort((a, b) => a.title.localeCompare(b.title))
    default:
      return result
  }
})
</script>
