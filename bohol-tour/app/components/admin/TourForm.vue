<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>

    <!-- Section: Basic Info -->
    <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h2 class="text-sm font-semibold text-slate-900">Basic Info</h2>
        <p class="text-xs text-slate-400 mt-0.5">Core details visible to guests</p>
      </div>
      <div class="p-5 grid sm:grid-cols-2 gap-4">
        <!-- Title -->
        <div class="sm:col-span-2">
          <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Tour Title <span class="text-red-400">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. Chocolate Hills Adventure"
            required
            class="w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
            :class="errors.title ? 'border-red-300 bg-red-50' : 'border-slate-200'"
          />
          <p v-if="errors.title" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
            {{ errors.title }}
          </p>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Price (₱) <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₱</span>
            <input
              v-model.number="form.price"
              type="number"
              min="0"
              step="100"
              placeholder="2500"
              required
              class="w-full pl-7 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
              :class="errors.price ? 'border-red-300 bg-red-50' : 'border-slate-200'"
            />
          </div>
          <p v-if="errors.price" class="mt-1.5 text-xs text-red-500">{{ errors.price }}</p>
        </div>

        <!-- Duration -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Duration <span class="text-red-400">*</span>
          </label>
          <input
            v-model="form.duration"
            type="text"
            placeholder="e.g. Full Day, Half Day"
            required
            class="w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
            :class="errors.duration ? 'border-red-300 bg-red-50' : 'border-slate-200'"
          />
          <p v-if="errors.duration" class="mt-1.5 text-xs text-red-500">{{ errors.duration }}</p>
        </div>

        <!-- Location -->
        <div class="sm:col-span-2">
          <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Location <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              v-model="form.location"
              type="text"
              placeholder="e.g. Carmen, Bohol"
              required
              class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
              :class="errors.location ? 'border-red-300 bg-red-50' : 'border-slate-200'"
            />
          </div>
          <p v-if="errors.location" class="mt-1.5 text-xs text-red-500">{{ errors.location }}</p>
        </div>

        <!-- Description -->
        <div class="sm:col-span-2">
          <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Description <span class="text-red-400">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Describe what makes this tour special — highlights, inclusions, experiences..."
            required
            class="w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none transition leading-relaxed"
            :class="errors.description ? 'border-red-300 bg-red-50' : 'border-slate-200'"
          />
          <div class="flex items-center justify-between mt-1">
            <p v-if="errors.description" class="text-xs text-red-500">{{ errors.description }}</p>
            <span v-else class="text-[10px] text-slate-400">{{ form.description.length }} characters</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section: Media -->
    <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h2 class="text-sm font-semibold text-slate-900">Media</h2>
        <p class="text-xs text-slate-400 mt-0.5">Images shown on the tour listing and detail page</p>
      </div>
      <div class="p-5">
        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Image URLs</label>
        <p class="text-xs text-slate-400 mb-2">Add one URL per line. The first image is used as the cover.</p>
        <textarea
          :value="imagesText"
          @input="imagesText = ($event.target as HTMLTextAreaElement).value"
          rows="3"
          placeholder="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 font-mono placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
        />

        <!-- Image preview -->
        <div v-if="previewImages.length > 0" class="mt-3 flex gap-2 flex-wrap">
          <div
            v-for="(url, i) in previewImages.slice(0, 4)"
            :key="i"
            class="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
          >
            <img :src="url" :alt="`Preview ${i + 1}`" class="w-full h-full object-cover" />
            <div v-if="i === 0" class="absolute inset-0 flex items-center justify-center bg-black/30">
              <span class="text-white text-[9px] font-bold">COVER</span>
            </div>
          </div>
          <div v-if="previewImages.length > 4" class="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
            +{{ previewImages.length - 4 }}
          </div>
        </div>
      </div>
    </div>

    <!-- Section: Settings -->
    <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h2 class="text-sm font-semibold text-slate-900">Settings</h2>
        <p class="text-xs text-slate-400 mt-0.5">Visibility and availability</p>
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-800">Public visibility</p>
            <p class="text-xs text-slate-400 mt-0.5">Show this tour on the public website</p>
          </div>
          <button
            type="button"
            role="switch"
            :aria-checked="form.is_active"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
            :class="form.is_active ? 'bg-ocean-600' : 'bg-slate-200'"
            @click="form.is_active = !form.is_active"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
              :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
        <div class="mt-1">
          <span
            class="text-xs font-medium"
            :class="form.is_active ? 'text-emerald-600' : 'text-slate-400'"
          >
            {{ form.is_active ? 'Active — visible to the public' : 'Inactive — hidden from public listing' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div
      v-if="submitError"
      class="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4"
    >
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ submitError }}
    </div>

    <!-- Form actions -->
    <div class="flex items-center gap-3">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 sm:flex-none sm:min-w-[140px] py-2.5 px-6 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ loading ? 'Saving...' : (isEdit ? 'Update Tour' : 'Create Tour') }}
      </button>
      <NuxtLink
        to="/admin/tours"
        class="py-2.5 px-5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl transition-colors text-sm"
      >
        Cancel
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Tour, TourFormData } from '~/types'

const props = defineProps<{ initial?: Tour; isEdit?: boolean }>()
const emit = defineEmits<{ submit: [data: TourFormData] }>()

const { createTour, updateTour } = useTours()

const form = reactive<TourFormData>({
  title: props.initial?.title ?? '',
  description: props.initial?.description ?? '',
  price: props.initial?.price ?? 0,
  duration: props.initial?.duration ?? '',
  location: props.initial?.location ?? '',
  images: props.initial?.images ?? [],
  is_active: props.initial?.is_active ?? true,
})

const imagesText = ref((props.initial?.images ?? []).join('\n'))
const loading = ref(false)
const submitError = ref('')
const errors = reactive<Partial<Record<keyof TourFormData, string>>>({})

const previewImages = computed(() =>
  imagesText.value
    .split('\n')
    .map((u) => u.trim())
    .filter(Boolean)
)

const validate = () => {
  Object.keys(errors).forEach((k) => delete (errors as Record<string, string>)[k])
  if (!form.title.trim()) errors.title = 'Title is required'
  if (!form.price || form.price <= 0) errors.price = 'A valid price is required'
  if (!form.duration.trim()) errors.duration = 'Duration is required'
  if (!form.location.trim()) errors.location = 'Location is required'
  if (!form.description.trim()) errors.description = 'Description is required'
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  submitError.value = ''

  form.images = imagesText.value
    .split('\n')
    .map((u) => u.trim())
    .filter(Boolean)

  try {
    if (props.isEdit && props.initial?.id) {
      await updateTour(props.initial.id, { ...form })
    } else {
      await createTour({ ...form })
    }
    emit('submit', { ...form })
    await navigateTo('/admin/tours')
  } catch (e: unknown) {
    submitError.value = e instanceof Error ? e.message : 'Failed to save tour. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
