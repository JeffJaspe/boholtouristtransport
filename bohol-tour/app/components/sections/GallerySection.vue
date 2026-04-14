<template>
  <section class="py-28 bg-slate-950 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Section header ─────────────────────── -->
      <div class="text-center mb-14">
        <div class="flex items-center justify-center gap-3 mb-4 sr">
          <div class="h-px w-8 bg-gradient-to-r from-transparent to-ocean-400" />
          <span class="text-ocean-400 text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
          <div class="h-px w-8 bg-gradient-to-l from-transparent to-ocean-400" />
        </div>
        <h2 class="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-white mb-4 sr sr-d1">
          Bohol in Pictures
        </h2>
        <p class="text-slate-400 text-lg max-w-lg mx-auto sr sr-d2">
          A glimpse of the paradise that awaits
        </p>
      </div>

      <!-- ── Masonry grid ────────────────────────── -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="(image, i) in gallery"
          :key="image.id"
          class="group relative overflow-hidden rounded-2xl cursor-pointer sr"
          :class="[
            image.span === 'tall' ? 'row-span-2' : '',
            image.span === 'wide' ? 'col-span-2' : '',
            `sr-d${Math.min(i + 1, 6)}`,
          ]"
          :style="{ aspectRatio: getAspectRatio(image.span) }"
          @click="openLightbox(i)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110 will-change-transform"
            loading="lazy"
          />
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
          <!-- Caption + expand icon -->
          <div class="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-spring flex items-end justify-between">
            <span class="text-white text-sm font-semibold drop-shadow-lg">{{ image.alt }}</span>
            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- ── View more CTA ──────────────────────── -->
      <div class="text-center mt-12 sr">
        <NuxtLink
          to="/tours"
          class="inline-flex items-center gap-2.5 px-8 py-3.5 glass text-white font-semibold rounded-2xl hover:bg-white/15 transition-all duration-300 btn-press text-sm border border-white/10"
        >
          See All Destinations
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- ── Lightbox ────────────────────────────── -->
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxIndex !== null"
        class="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          class="absolute top-5 right-5 w-10 h-10 rounded-xl glass text-white/80 hover:text-white flex items-center justify-center transition-all btn-press"
          @click="closeLightbox"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Prev / Next -->
        <button
          class="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass text-white/80 hover:text-white flex items-center justify-center transition-all btn-press"
          @click="lightboxIndex = (lightboxIndex - 1 + gallery.length) % gallery.length"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass text-white/80 hover:text-white flex items-center justify-center transition-all btn-press"
          @click="lightboxIndex = (lightboxIndex + 1) % gallery.length"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Transition
          enter-active-class="transition duration-300 ease-spring"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          mode="out-in"
        >
          <img
            :key="lightboxIndex"
            :src="gallery[lightboxIndex].src.replace('w=400', 'w=1200').replace('w=600', 'w=1400')"
            :alt="gallery[lightboxIndex].alt"
            class="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-hero"
          />
        </Transition>

        <!-- Dot indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          <button
            v-for="(_, i) in gallery"
            :key="i"
            class="rounded-full transition-all duration-300 btn-press"
            :class="i === lightboxIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'"
            @click="lightboxIndex = i"
          />
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/types'

useScrollReveal()

const lightboxIndex = ref<number | null>(null)
const openLightbox = (i: number) => (lightboxIndex.value = i)
const closeLightbox = () => (lightboxIndex.value = null)

const getAspectRatio = (span?: string) =>
  span === 'tall' ? '3/4' : span === 'wide' ? '16/7' : '1/1'

const gallery: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80', alt: 'Panglao Beach', span: 'wide' },
  { id: 2, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', alt: 'Snorkeling', span: 'normal' },
  { id: 3, src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', alt: 'Bohol Island', span: 'normal' },
  { id: 4, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', alt: 'Pristine Beach', span: 'tall' },
  { id: 5, src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=600&q=80', alt: 'Chocolate Hills', span: 'normal' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80', alt: 'Tropical Lagoon', span: 'normal' },
  { id: 7, src: 'https://images.unsplash.com/photo-1571404114025-fcfda73cfca4?w=400&q=80', alt: 'Island Hopping', span: 'normal' },
]
</script>
