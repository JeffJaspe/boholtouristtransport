<template>
  <NuxtLink
    :to="`/tours/${tour.id}`"
    class="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 ease-spring hover:-translate-y-2 will-change-transform"
  >
    <!-- ── Image ─────────────────────────────────────── -->
    <div class="relative overflow-hidden bg-slate-100" style="aspect-ratio: 3/2">
      <img
        :src="tour.images[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'"
        :alt="tour.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110 will-change-transform"
        loading="lazy"
      />

      <!-- Gradient overlay (deepens on hover) -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-400" />

      <!-- Duration pill — top left -->
      <div class="absolute top-3 left-3 glass-light text-slate-800 text-2xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
        <svg class="w-3 h-3 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ tour.duration }}
      </div>

      <!-- Price badge — top right -->
      <div class="absolute top-3 right-3 bg-ocean-600 text-white text-2xs font-extrabold px-2.5 py-1.5 rounded-full shadow-lg shadow-ocean-900/30 tracking-wide">
        ₱{{ tour.price.toLocaleString() }}
      </div>

      <!-- Slide-up CTA (appears on hover from bottom) -->
      <div class="absolute inset-x-3 bottom-3 translate-y-[calc(100%+12px)] group-hover:translate-y-0 transition-transform duration-400 ease-spring">
        <div class="bg-white text-ocean-700 font-bold text-xs px-4 py-2.5 rounded-xl text-center shadow-lg flex items-center justify-center gap-2">
          View Tour
          <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- ── Content ─────────────────────────────────── -->
    <div class="flex flex-col flex-1 p-5">
      <!-- Location -->
      <div class="flex items-center gap-1.5 mb-2">
        <svg class="w-3 h-3 text-ocean-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="text-ocean-600 text-2xs font-bold uppercase tracking-wider">{{ tour.location }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-slate-900 text-base leading-snug mb-2.5 group-hover:text-ocean-700 transition-colors duration-200 line-clamp-2">
        {{ tour.title }}
      </h3>

      <!-- Description -->
      <p class="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
        {{ tour.description }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3.5 border-t border-slate-100/80">
        <!-- Stars + reviews -->
        <div class="flex items-center gap-1.5">
          <div class="flex gap-px">
            <svg v-for="s in 5" :key="s" class="w-3 h-3 text-sand-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span class="text-slate-400 text-2xs font-medium">4.9 <span class="text-slate-300">(124)</span></span>
        </div>

        <!-- Arrow button -->
        <div class="w-8 h-8 bg-ocean-50 group-hover:bg-ocean-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-glow-ocean group-hover:scale-110">
          <svg class="w-3.5 h-3.5 text-ocean-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'
defineProps<{ tour: Tour }>()
</script>
