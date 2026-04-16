<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink
        to="/admin/tours"
        class="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-xl font-bold text-slate-900">Edit Tour</h1>
        <p class="text-slate-500 text-sm">Update the details for this tour package</p>
      </div>
    </div>

    <div v-if="loading" class="space-y-4">
      <div class="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
        <div v-for="n in 5" :key="n" class="h-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    </div>

    <div v-else-if="!tour" class="text-center py-16 bg-white rounded-2xl border border-slate-100">
      <p class="text-slate-500">Tour not found.</p>
      <NuxtLink to="/admin/tours" class="text-ocean-600 hover:underline text-sm mt-2 block">← Back to tours</NuxtLink>
    </div>

    <AdminTourForm v-else :initial="tour" :is-edit="true" />
  </div>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { fetchTourById } = useTours()
const tour = ref<Tour | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    tour.value = await fetchTourById(route.params.id as string)
  } finally {
    loading.value = false
  }
})
</script>
