<template>
  <div class="min-h-screen bg-white">
    <!-- Loading -->
    <div v-if="loading" class="pt-32 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-8 bg-slate-200 rounded-full w-1/3 animate-pulse mb-6" />
        <div class="aspect-[16/7] bg-slate-200 rounded-3xl animate-pulse mb-10" />
        <div class="grid lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 space-y-4">
            <div class="h-6 bg-slate-200 rounded-full animate-pulse" />
            <div class="h-6 bg-slate-200 rounded-full w-5/6 animate-pulse" />
            <div class="h-4 bg-slate-200 rounded-full w-full animate-pulse" />
            <div class="h-4 bg-slate-200 rounded-full w-4/5 animate-pulse" />
          </div>
          <div class="h-96 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>

    <!-- 404 -->
    <div v-else-if="!tour" class="pt-40 text-center pb-20">
      <div class="text-7xl mb-4">🌊</div>
      <h1 class="text-2xl font-bold text-slate-900 mb-3">Tour Not Found</h1>
      <p class="text-slate-500 mb-8">This tour may have been removed or is unavailable.</p>
      <NuxtLink to="/tours" class="px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-700 transition-colors">
        Browse All Tours
      </NuxtLink>
    </div>

    <!-- Content -->
    <div v-else class="pt-24">
      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center gap-2 text-sm text-slate-400">
          <NuxtLink to="/" class="hover:text-ocean-600 transition-colors">Home</NuxtLink>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <NuxtLink to="/tours" class="hover:text-ocean-600 transition-colors">Tours</NuxtLink>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-slate-700 font-medium truncate max-w-xs">{{ tour.title }}</span>
        </nav>
      </div>

      <!-- Image gallery -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden h-72 sm:h-96 md:h-[480px]">
          <div class="md:col-span-2 relative overflow-hidden cursor-pointer" @click="activeImage = 0">
            <img
              :src="tour.images[0] || heroFallback"
              :alt="tour.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="hidden md:grid grid-rows-2 gap-3">
            <div
              v-for="(img, i) in tour.images.slice(1, 3)"
              :key="i"
              class="relative overflow-hidden cursor-pointer"
              @click="activeImage = i + 1"
            >
              <img
                :src="img"
                :alt="`${tour.title} ${i + 2}`"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div
                v-if="i === 1 && tour.images.length > 3"
                class="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                @click.stop="activeImage = i + 1"
              >
                <span class="text-white font-semibold text-sm">+{{ tour.images.length - 3 }} more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Left: details -->
          <div class="lg:col-span-2">
            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-2 text-ocean-600 text-sm font-medium mb-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {{ tour.location }}
                </div>
                <h1 class="font-display text-3xl sm:text-4xl font-bold text-slate-900">{{ tour.title }}</h1>
              </div>
              <div class="text-right">
                <div class="text-xs text-slate-400 mb-0.5">From</div>
                <div class="text-3xl font-bold text-ocean-600">₱{{ tour.price.toLocaleString() }}</div>
                <div class="text-xs text-slate-400">per person</div>
              </div>
            </div>

            <!-- Quick info pills -->
            <div class="flex flex-wrap gap-3 mb-8">
              <span class="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ tour.duration }}
              </span>
              <span class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free Cancellation
              </span>
              <span class="inline-flex items-center gap-1.5 bg-ocean-50 text-ocean-700 text-sm font-medium px-3 py-1.5 rounded-full">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Small Groups
              </span>
            </div>

            <!-- Description -->
            <div class="mb-10">
              <h2 class="text-xl font-bold text-slate-900 mb-4">About This Tour</h2>
              <p class="text-slate-600 leading-relaxed text-base">{{ tour.description }}</p>
            </div>

            <!-- Inclusions / Exclusions -->
            <div class="grid sm:grid-cols-2 gap-6 mb-10">
              <div class="bg-green-50 rounded-2xl p-5 border border-green-100">
                <h3 class="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What's Included
                </h3>
                <ul class="space-y-2">
                  <li v-for="item in inclusions" :key="item" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 class="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Not Included
                </h3>
                <ul class="space-y-2">
                  <li v-for="item in exclusions" :key="item" class="flex items-start gap-2 text-sm text-slate-500">
                    <svg class="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Itinerary -->
            <div>
              <h2 class="text-xl font-bold text-slate-900 mb-5">Tour Itinerary</h2>
              <div class="relative pl-8">
                <div class="absolute left-3 top-2 bottom-2 w-0.5 bg-ocean-100" />
                <div v-for="(step, i) in itinerary" :key="i" class="relative mb-6 last:mb-0">
                  <div class="absolute -left-5 w-4 h-4 rounded-full border-2 border-ocean-600 bg-white flex items-center justify-center">
                    <div class="w-1.5 h-1.5 bg-ocean-600 rounded-full" />
                  </div>
                  <div class="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                    <div class="text-xs font-bold text-ocean-600 uppercase tracking-wider mb-1">{{ step.time }}</div>
                    <div class="font-semibold text-slate-900 mb-1">{{ step.title }}</div>
                    <div class="text-sm text-slate-500">{{ step.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Booking form (sticky) -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 bg-white rounded-3xl border border-slate-200 shadow-xl p-6">
              <div class="mb-5">
                <div class="text-xs text-slate-400 mb-0.5">Starting from</div>
                <div class="text-3xl font-bold text-ocean-600">₱{{ tour.price.toLocaleString() }}</div>
                <div class="text-xs text-slate-400">per person</div>
              </div>
              <div class="border-t border-slate-100 mb-5" />
              <h3 class="font-bold text-slate-900 mb-5 text-base">Book This Tour</h3>
              <BookingForm :tour-id="tour.id" :price="tour.price" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'

definePageMeta({ layout: 'default' })

const route = useRoute()
const { fetchTourById } = useTours()

const tour = ref<Tour | null>(null)
const loading = ref(true)
const activeImage = ref(0)

const heroFallback = 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80'

onMounted(async () => {
  try {
    tour.value = await fetchTourById(route.params.id as string)
  } finally {
    loading.value = false
  }
})

useSeoMeta({
  title: computed(() => (tour.value ? `${tour.value.title} — BoholTours` : 'Tour — BoholTours')),
  description: computed(() => tour.value?.description ?? ''),
})

const inclusions = [
  'Air-conditioned van transport',
  'Licensed local tour guide',
  'Entrance fees included',
  'Bottled water & light snacks',
  'Free hotel pickup & drop-off',
  'First aid kit on board',
]

const exclusions = [
  'Meals & beverages (except water)',
  'Personal expenses & tips',
  'Travel insurance',
  'Optional add-on activities',
]

const itinerary = [
  { time: '6:00 AM', title: 'Hotel Pickup', desc: 'Our driver picks you up at your hotel lobby.' },
  { time: '8:00 AM', title: 'Main Attraction', desc: 'Arrive at the main tour destination and begin your guided adventure.' },
  { time: '12:00 PM', title: 'Lunch Break', desc: 'Enjoy a traditional Filipino lunch at a local restaurant (own account).' },
  { time: '2:00 PM', title: 'Afternoon Activities', desc: 'Continue exploring secondary attractions and scenic viewpoints.' },
  { time: '5:00 PM', title: 'Return Journey', desc: 'Head back to Tagbilaran City with wonderful memories.' },
  { time: '6:30 PM', title: 'Hotel Drop-off', desc: 'Arrive back at your accommodation, refreshed and fulfilled.' },
]
</script>
