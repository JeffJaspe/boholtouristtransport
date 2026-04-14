<template>
  <section class="py-28 bg-slate-50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Section header ────────────────────────── -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4 sr">
          <div class="h-px w-8 bg-gradient-to-r from-transparent to-ocean-600" />
          <span class="text-ocean-600 text-xs font-bold uppercase tracking-[0.2em]">Testimonials</span>
          <div class="h-px w-8 bg-gradient-to-l from-transparent to-ocean-600" />
        </div>
        <h2 class="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-slate-900 mb-4 sr sr-d1">
          What Travelers Say
        </h2>
        <p class="text-slate-500 text-lg max-w-xl mx-auto sr sr-d2">
          Real stories from real adventurers who explored Bohol with us
        </p>

        <!-- Overall rating bar -->
        <div class="inline-flex items-center gap-3 mt-6 bg-white rounded-2xl px-6 py-3.5 shadow-card sr sr-d3">
          <div class="flex gap-0.5">
            <svg v-for="s in 5" :key="s" class="w-5 h-5 text-sand-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span class="font-bold text-slate-900">4.9</span>
          <span class="text-slate-400 text-sm">based on 2,000+ reviews</span>
        </div>
      </div>

      <!-- ── Cards ──────────────────────────────────── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="testimonial.id"
          class="group relative bg-white rounded-3xl p-7 shadow-card hover:shadow-card-hover transition-all duration-400 ease-spring hover:-translate-y-2 overflow-hidden sr"
          :class="[`sr-d${i + 1}`, i === 1 ? 'md:-translate-y-6' : '']"
        >
          <!-- Top accent gradient bar -->
          <div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl" :class="accents[i]" />

          <!-- Card shine on hover -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-ocean-50/30 via-transparent to-transparent pointer-events-none rounded-3xl" />

          <!-- Large decorative quote -->
          <div class="absolute -top-1 -right-1 font-display text-[7rem] leading-none text-slate-100 group-hover:text-ocean-50 transition-colors duration-400 select-none pointer-events-none">
            "
          </div>

          <!-- Stars -->
          <div class="flex gap-0.5 mb-5 relative z-10">
            <svg
              v-for="s in 5"
              :key="s"
              class="w-4 h-4 transition-transform duration-300"
              :class="[s <= testimonial.rating ? 'text-sand-400' : 'text-slate-200', `group-hover:scale-110 group-hover:delay-[${s * 50}ms]`]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <!-- Quote text -->
          <p class="text-slate-600 text-sm leading-relaxed mb-7 relative z-10">
            "{{ testimonial.comment }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3.5 relative z-10 pt-5 border-t border-slate-100">
            <div class="relative">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
              />
              <!-- Verified checkmark -->
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-ocean-600 rounded-full flex items-center justify-center shadow-sm">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <div class="font-bold text-slate-900 text-sm">{{ testimonial.name }}</div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <svg class="w-3 h-3 text-ocean-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span class="text-slate-400 text-2xs">{{ testimonial.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Trust bar ──────────────────────────────── -->
      <div class="mt-16 flex flex-wrap items-center justify-center gap-8 sr">
        <div v-for="trust in trustItems" :key="trust.label" class="flex items-center gap-2.5 text-slate-400 hover:text-slate-600 transition-colors">
          <svg class="w-5 h-5 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="trust.icon" />
          </svg>
          <span class="text-sm font-medium">{{ trust.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Testimonial } from '~/types'

useScrollReveal()

const accents = [
  'bg-gradient-to-r from-ocean-400 to-teal-400',
  'bg-gradient-to-r from-sand-300 to-sand-500',
  'bg-gradient-to-r from-purple-400 to-ocean-400',
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80',
    rating: 5,
    comment: 'The island hopping tour was absolutely breathtaking. Our guide was incredibly knowledgeable and the snorkeling at Balicasag was world-class — we spotted three sea turtles!',
  },
  {
    id: 2,
    name: 'Marco Reyes',
    location: 'Manila, Philippines',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    rating: 5,
    comment: 'I\'ve traveled all over the Philippines and this was the best organized tour I\'ve been on. Chocolate Hills at sunrise was worth every peso. The team went above and beyond!',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    rating: 5,
    comment: 'The tarsier sanctuary was magical — those tiny creatures are adorable! The heritage tour gave us genuine insight into Bohol\'s rich culture. Already planning our return trip.',
  },
]

const trustItems = [
  { label: 'Licensed & Insured', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Free Cancellation', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { label: 'Instant Confirmation', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: '24/7 Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
]
</script>
