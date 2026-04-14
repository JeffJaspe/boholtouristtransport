<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage Tours</h1>
        <p class="text-slate-500 text-sm mt-1">{{ tours.length }} tour(s) total</p>
      </div>
      <NuxtLink
        to="/admin/tours/create"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Tour
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="n in 6" :key="n" class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 animate-pulse">
        <div class="aspect-video bg-slate-200 rounded-xl mb-4" />
        <div class="h-4 bg-slate-200 rounded-full mb-2" />
        <div class="h-3 bg-slate-200 rounded-full w-2/3" />
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="tours.length === 0" class="text-center py-24 bg-white rounded-2xl border border-slate-100">
      <div class="text-6xl mb-4">🌴</div>
      <h3 class="text-lg font-bold text-slate-900 mb-2">No tours yet</h3>
      <p class="text-slate-500 text-sm mb-6">Create your first tour to get started</p>
      <NuxtLink to="/admin/tours/create" class="px-5 py-2.5 bg-ocean-600 text-white rounded-xl font-semibold hover:bg-ocean-700 transition-colors text-sm">
        Create First Tour
      </NuxtLink>
    </div>

    <!-- Tours grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="tour in tours"
        :key="tour.id"
        class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all"
      >
        <!-- Image -->
        <div class="aspect-video relative overflow-hidden bg-slate-100">
          <img
            :src="tour.images[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'"
            :alt="tour.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 left-3">
            <span
              class="text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
              :class="tour.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'"
            >
              {{ tour.is_active ? '● Active' : '○ Inactive' }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <div class="text-xs text-slate-400 mb-1">{{ tour.location }}</div>
          <h3 class="font-semibold text-slate-900 mb-1 line-clamp-1">{{ tour.title }}</h3>
          <div class="flex items-center justify-between mt-1 mb-4">
            <span class="text-ocean-600 font-bold text-sm">₱{{ tour.price.toLocaleString() }}</span>
            <span class="text-xs text-slate-400">{{ tour.duration }}</span>
          </div>

          <div class="flex gap-2">
            <NuxtLink
              :to="`/admin/tours/${tour.id}`"
              class="flex-1 py-2 text-center text-xs font-semibold text-ocean-700 bg-ocean-50 hover:bg-ocean-100 rounded-lg transition-colors"
            >
              Edit
            </NuxtLink>
            <NuxtLink
              :to="`/tours/${tour.id}`"
              target="_blank"
              class="py-2 px-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Preview
            </NuxtLink>
            <button
              class="py-2 px-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              @click="confirmDelete(tour.id, tour.title)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm dialog -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div v-if="deleteTarget" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="deleteTarget = null">
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="text-center font-bold text-slate-900 mb-2">Delete Tour?</h3>
          <p class="text-center text-slate-500 text-sm mb-6">
            "<strong>{{ deleteTarget.title }}</strong>" will be permanently deleted.
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
              :disabled="deleting"
              @click="handleDelete"
            >
              {{ deleting ? 'Deleting...' : 'Yes, Delete' }}
            </button>
            <button
              class="flex-1 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-xl transition-colors"
              @click="deleteTarget = null"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Tour } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { fetchTours, deleteTour } = useTours()
const tours = ref<Tour[]>([])
const loading = ref(true)
const deleteTarget = ref<{ id: string; title: string } | null>(null)
const deleting = ref(false)

onMounted(async () => {
  try {
    tours.value = await fetchTours(false)
  } finally {
    loading.value = false
  }
})

const confirmDelete = (id: string, title: string) => {
  deleteTarget.value = { id, title }
}

const handleDelete = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await deleteTour(deleteTarget.value.id)
    tours.value = tours.value.filter((t) => t.id !== deleteTarget.value?.id)
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}
</script>
