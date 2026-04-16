<template>
  <div class="max-w-5xl mx-auto">
    <!-- Errors -->
    <div v-if="loadError || actionError" class="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ loadError ?? actionError }}
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-slate-900">Tours</h1>
        <p class="text-slate-500 text-sm mt-0.5">{{ tours.length }} tour{{ tours.length !== 1 ? 's' : '' }} total</p>
      </div>
      <NuxtLink
        to="/admin/tours/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Tour
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="mb-5">
      <div class="relative max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="search"
          type="search"
          placeholder="Search tours..."
          class="pl-9 pr-4 py-2 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div v-for="n in 5" :key="n" class="flex items-center gap-4 px-5 py-4 border-b border-slate-100 last:border-0 animate-pulse">
        <div class="w-14 h-14 bg-slate-200 rounded-xl shrink-0" />
        <div class="flex-1 space-y-2">
          <div class="h-3.5 bg-slate-200 rounded-full w-1/3" />
          <div class="h-3 bg-slate-100 rounded-full w-1/4" />
        </div>
        <div class="w-16 h-8 bg-slate-100 rounded-lg" />
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="filteredTours.length === 0" class="text-center py-24 bg-white rounded-2xl border border-slate-200/80">
      <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </div>
      <h3 class="text-base font-semibold text-slate-900 mb-1">{{ search ? 'No results found' : 'No tours yet' }}</h3>
      <p class="text-slate-500 text-sm mb-5">{{ search ? 'Try a different search term' : 'Create your first tour to get started' }}</p>
      <NuxtLink
        v-if="!search"
        to="/admin/tours/create"
        class="inline-flex px-4 py-2 bg-ocean-600 text-white rounded-xl font-semibold hover:bg-ocean-700 transition-colors text-sm"
      >
        Create First Tour
      </NuxtLink>
    </div>

    <!-- Tours list -->
    <div v-else class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div
        v-for="(tour, i) in filteredTours"
        :key="tour.id"
        class="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/80 group"
        :class="{ 'border-t border-slate-100': i > 0 }"
      >
        <!-- Thumbnail -->
        <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img
            :src="tour.images[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&q=70'"
            :alt="tour.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-slate-900 text-sm truncate">{{ tour.title }}</h3>
          </div>
          <div class="flex items-center gap-3 mt-0.5">
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ tour.location }}
            </span>
            <span class="text-xs text-slate-400">{{ tour.duration }}</span>
            <span class="text-xs font-semibold text-ocean-600">₱{{ tour.price.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Active toggle -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            role="switch"
            :aria-checked="tour.is_active"
            :aria-label="tour.is_active ? 'Deactivate tour' : 'Activate tour'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-1"
            :class="tour.is_active ? 'bg-emerald-500' : 'bg-slate-200'"
            :disabled="togglingId === tour.id"
            @click="toggleActive(tour)"
          >
            <span
              class="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
              :class="tour.is_active ? 'translate-x-4' : 'translate-x-0.5'"
            />
          </button>
          <span class="text-xs text-slate-400 w-14">{{ tour.is_active ? 'Active' : 'Inactive' }}</span>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <NuxtLink
            :to="`/tours/${tour.id}`"
            target="_blank"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Preview"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </NuxtLink>

          <NuxtLink
            :to="`/admin/tours/${tour.id}`"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-ocean-600 hover:bg-ocean-50 transition-colors"
            title="Edit"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </NuxtLink>

          <button
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
            @click="confirmDelete(tour.id, tour.title)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="deleteTarget" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="deleteTarget = null">
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200/80">
          <div class="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="text-center font-bold text-slate-900 mb-1.5">Delete Tour?</h3>
          <p class="text-center text-slate-500 text-sm mb-6">
            "<strong class="text-slate-700">{{ deleteTarget.title }}</strong>" will be permanently deleted and cannot be recovered.
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
              :disabled="deleting"
              @click="handleDelete"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
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

const { fetchTours, deleteTour, updateTour } = useTours()

const tours = ref<Tour[]>([])
const loading = ref(true)
const loadError = ref<string | null>(null)
const actionError = ref<string | null>(null)
const search = ref('')
const deleteTarget = ref<{ id: string; title: string } | null>(null)
const deleting = ref(false)
const togglingId = ref<string | null>(null)

onMounted(async () => {
  try {
    tours.value = await fetchTours(false)
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : 'Failed to load tours'
  } finally {
    loading.value = false
  }
})

const filteredTours = computed(() => {
  if (!search.value) return tours.value
  const q = search.value.toLowerCase()
  return tours.value.filter(
    (t) => t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
  )
})

const toggleActive = async (tour: Tour) => {
  togglingId.value = tour.id
  actionError.value = null
  try {
    await updateTour(tour.id, { is_active: !tour.is_active })
    tour.is_active = !tour.is_active
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to update tour status'
  } finally {
    togglingId.value = null
  }
}

const confirmDelete = (id: string, title: string) => {
  deleteTarget.value = { id, title }
}

const handleDelete = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  actionError.value = null
  try {
    await deleteTour(deleteTarget.value.id)
    tours.value = tours.value.filter((t) => t.id !== deleteTarget.value?.id)
    deleteTarget.value = null
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to delete tour'
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}
</script>
