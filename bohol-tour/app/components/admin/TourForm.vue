<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <div class="grid sm:grid-cols-2 gap-5">
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Tour Title <span class="text-red-500">*</span></label>
        <input
          v-model="form.title"
          type="text"
          placeholder="e.g. Chocolate Hills Adventure"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          :class="{ 'border-red-400': errors.title }"
        />
        <p v-if="errors.title" class="mt-1 text-xs text-red-500">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Price (₱) <span class="text-red-500">*</span></label>
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="100"
          placeholder="2500"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          :class="{ 'border-red-400': errors.price }"
        />
        <p v-if="errors.price" class="mt-1 text-xs text-red-500">{{ errors.price }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Duration <span class="text-red-500">*</span></label>
        <input
          v-model="form.duration"
          type="text"
          placeholder="e.g. 1 Full Day, Half Day"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          :class="{ 'border-red-400': errors.duration }"
        />
        <p v-if="errors.duration" class="mt-1 text-xs text-red-500">{{ errors.duration }}</p>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Location <span class="text-red-500">*</span></label>
        <input
          v-model="form.location"
          type="text"
          placeholder="e.g. Carmen, Bohol"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          :class="{ 'border-red-400': errors.location }"
        />
        <p v-if="errors.location" class="mt-1 text-xs text-red-500">{{ errors.location }}</p>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Description <span class="text-red-500">*</span></label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Describe the tour experience..."
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
          :class="{ 'border-red-400': errors.description }"
        />
        <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Image URLs</label>
        <p class="text-xs text-slate-400 mb-2">One URL per line</p>
        <textarea
          :value="imagesText"
          @input="imagesText = ($event.target as HTMLTextAreaElement).value"
          rows="3"
          placeholder="https://images.unsplash.com/..."
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
        />
      </div>

      <div class="sm:col-span-2 flex items-center gap-3">
        <button
          type="button"
          role="switch"
          :aria-checked="form.is_active"
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          :class="form.is_active ? 'bg-ocean-600' : 'bg-slate-200'"
          @click="form.is_active = !form.is_active"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
            :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
        <span class="text-sm font-medium text-slate-700">Active (visible to public)</span>
      </div>
    </div>

    <p v-if="submitError" class="text-sm text-red-600 bg-red-50 rounded-xl p-3">{{ submitError }}</p>

    <div class="flex gap-3 pt-2">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 py-3 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ loading ? 'Saving...' : (isEdit ? 'Update Tour' : 'Create Tour') }}
      </button>
      <NuxtLink
        to="/admin/tours"
        class="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-xl transition-colors text-center text-sm"
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

const validate = () => {
  Object.keys(errors).forEach((k) => delete (errors as Record<string, string>)[k])
  if (!form.title.trim()) errors.title = 'Title is required'
  if (!form.price || form.price <= 0) errors.price = 'Valid price required'
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
    submitError.value = e instanceof Error ? e.message : 'Failed to save tour.'
  } finally {
    loading.value = false
  }
}
</script>
