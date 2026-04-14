<template>
  <div>
    <!-- Success state -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
    >
      <div v-if="success" class="text-center py-10">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Booking Submitted!</h3>
        <p class="text-slate-500 text-sm max-w-xs mx-auto mb-6">
          Thank you, <strong>{{ submittedName }}</strong>! We'll confirm your booking within 24 hours via email.
        </p>
        <button
          class="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
          @click="reset"
        >
          Make another booking
        </button>
      </div>
    </Transition>

    <!-- Form -->
    <form v-if="!success" @submit.prevent="handleSubmit" class="space-y-4" novalidate>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Juan dela Cruz"
            required
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
            :class="{ 'border-red-400 focus:ring-red-400': errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span class="text-red-500">*</span></label>
          <input
            v-model="form.email"
            type="email"
            placeholder="juan@example.com"
            required
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
            :class="{ 'border-red-400 focus:ring-red-400': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Phone Number <span class="text-red-500">*</span></label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+63 9XX XXX XXXX"
            required
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
            :class="{ 'border-red-400 focus:ring-red-400': errors.phone }"
          />
          <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Number of Guests <span class="text-red-500">*</span></label>
          <select
            v-model="form.guests"
            required
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition bg-white"
          >
            <option value="" disabled>Select guests</option>
            <option v-for="n in 20" :key="n" :value="n">{{ n }} {{ n === 1 ? 'person' : 'people' }}</option>
          </select>
          <p v-if="errors.guests" class="mt-1 text-xs text-red-500">{{ errors.guests }}</p>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date <span class="text-red-500">*</span></label>
        <input
          v-model="form.date"
          type="date"
          :min="minDate"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition"
          :class="{ 'border-red-400 focus:ring-red-400': errors.date }"
        />
        <p v-if="errors.date" class="mt-1 text-xs text-red-500">{{ errors.date }}</p>
      </div>

      <!-- Price summary -->
      <div v-if="form.guests && price" class="bg-ocean-50 rounded-xl p-4 border border-ocean-100">
        <div class="flex justify-between text-sm text-slate-600 mb-1">
          <span>₱{{ price.toLocaleString() }} × {{ form.guests }} person(s)</span>
          <span class="font-semibold text-slate-900">₱{{ (price * Number(form.guests)).toLocaleString() }}</span>
        </div>
        <p class="text-xs text-slate-400">Final price confirmed upon booking approval</p>
      </div>

      <p v-if="submitError" class="text-sm text-red-600 bg-red-50 rounded-xl p-3">{{ submitError }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3.5 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ loading ? 'Submitting...' : 'Request Booking' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { BookingFormData } from '~/types'

const props = defineProps<{ tourId: string; price?: number }>()

const { createBooking } = useBookings()

const form = reactive<BookingFormData>({
  name: '',
  email: '',
  phone: '',
  date: '',
  guests: 1,
})

const errors = reactive<Partial<Record<keyof BookingFormData, string>>>({})
const loading = ref(false)
const success = ref(false)
const submittedName = ref('')
const submitError = ref('')

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

const validate = () => {
  Object.keys(errors).forEach((k) => delete (errors as Record<string, string>)[k])
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email required'
  if (!form.phone.trim()) errors.phone = 'Phone is required'
  if (!form.date) errors.date = 'Date is required'
  if (!form.guests || Number(form.guests) < 1) errors.guests = 'Select at least 1 guest'
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  submitError.value = ''
  try {
    await createBooking(props.tourId, { ...form, guests: Number(form.guests) })
    submittedName.value = form.name
    success.value = true
  } catch {
    submitError.value = 'Something went wrong. Please try again or call us directly.'
  } finally {
    loading.value = false
  }
}

const reset = () => {
  success.value = false
  Object.assign(form, { name: '', email: '', phone: '', date: '', guests: 1 })
}
</script>
