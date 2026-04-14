<template>
  <section id="about" class="py-28 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-20 items-center">

        <!-- ── Left: text ─────────────────────────── -->
        <div>
          <div class="flex items-center gap-3 mb-5 sr">
            <div class="h-px w-8 bg-gradient-to-r from-ocean-600 to-transparent" />
            <span class="text-ocean-600 text-xs font-bold uppercase tracking-[0.2em]">Why Choose Us</span>
          </div>

          <h2 class="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-slate-900 leading-tight mb-6 sr sr-d1">
            The best way to<br />
            <span class="text-gradient">experience Bohol</span>
          </h2>

          <p class="text-slate-500 text-lg leading-relaxed mb-12 max-w-lg sr sr-d2">
            We're a locally-owned team with deep roots in Bohol. Every tour is designed to give you authentic, respectful, and unforgettable access to the island's heart.
          </p>

          <!-- Feature list -->
          <div class="space-y-5">
            <div
              v-for="(feature, i) in features"
              :key="feature.title"
              class="group flex gap-5 p-5 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all duration-300 cursor-default sr"
              :class="`sr-d${i + 2}`"
            >
              <!-- Number + icon stack -->
              <div class="relative shrink-0">
                <span class="absolute -top-2 -left-2 text-[2.5rem] font-black text-slate-100 leading-none select-none group-hover:text-ocean-50 transition-colors duration-300">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <div
                  class="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-ocean"
                  :class="feature.bg"
                >
                  <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" :class="feature.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="feature.icon" />
                  </svg>
                </div>
              </div>

              <div class="flex-1 min-w-0 pt-1">
                <h3 class="font-bold text-slate-900 mb-1 group-hover:text-ocean-700 transition-colors duration-200">{{ feature.title }}</h3>
                <p class="text-slate-500 text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Right: image collage ─────────────────── -->
        <div class="relative h-[560px] sr sr-right">
          <!-- Primary image -->
          <div class="absolute top-0 left-0 w-[72%] h-[62%] rounded-3xl overflow-hidden shadow-xl-soft">
            <img
              src="https://images.unsplash.com/photo-1571404114025-fcfda73cfca4?w=700&q=80"
              alt="Island hopping"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-ocean-900/10 to-transparent" />
          </div>

          <!-- Secondary top-right -->
          <div class="absolute top-[10%] right-0 w-[44%] h-[40%] rounded-3xl overflow-hidden shadow-xl-soft">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"
              alt="Snorkeling"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <!-- Tertiary bottom-right -->
          <div class="absolute bottom-0 right-0 w-[55%] h-[42%] rounded-3xl overflow-hidden shadow-xl-soft">
            <img
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80"
              alt="Bohol landscape"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <!-- Bottom-left accent -->
          <div class="absolute bottom-[8%] left-[4%] w-[36%] h-[30%] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80"
              alt="Beach"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <!-- Floating rating badge -->
          <div class="absolute -bottom-6 left-[42%] -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100/50 z-10">
            <div class="w-10 h-10 bg-gradient-to-br from-sand-400 to-sand-500 rounded-xl flex items-center justify-center text-lg shadow-glow-sand">
              🌴
            </div>
            <div>
              <div class="font-extrabold text-slate-900 text-sm leading-none">4.9 / 5.0</div>
              <div class="text-slate-400 text-2xs mt-0.5">Top Rated in Bohol</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useScrollReveal()

const features = [
  {
    title: 'Local Expertise',
    description: 'Born and raised on the island — we know every hidden gem, secret beach, and local story.',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    bg: 'bg-ocean-100',
    iconColor: 'text-ocean-600',
  },
  {
    title: 'Safety First, Always',
    description: 'Certified guides, insured vehicles, and every route risk-assessed — your comfort is non-negotiable.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    bg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Best Price Guarantee',
    description: 'Premium experiences at fair, transparent prices. No hidden fees, no surprises — ever.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bg: 'bg-sand-100',
    iconColor: 'text-sand-600',
  },
  {
    title: 'Curated Experiences',
    description: 'Every itinerary is thoughtfully designed to maximize your time and leave you with lasting memories.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    bg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]
</script>
