<template>
  <div class="max-w-6xl mx-auto">
    <!-- Errors -->
    <div v-if="loadError" class="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ loadError }}
    </div>
    <div v-if="updateError" class="mb-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ updateError }}
    </div>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-xl font-bold text-slate-900">Bookings</h1>
        <p class="text-slate-500 text-sm mt-0.5">{{ filteredBookings.length }} booking{{ filteredBookings.length !== 1 ? 's' : '' }}</p>
      </div>

      <!-- Search -->
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="search"
          type="search"
          placeholder="Search guest or email..."
          class="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent w-56"
        />
      </div>
    </div>

    <!-- Filter pills -->
    <div class="flex items-center gap-2 mb-5 flex-wrap">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
        :class="statusFilter === opt.value
          ? opt.activeClass
          : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'"
        @click="statusFilter = opt.value"
      >
        <span v-if="statusFilter === opt.value" class="w-1.5 h-1.5 rounded-full bg-current" />
        {{ opt.label }}
        <span class="ml-0.5 opacity-60">{{ opt.count }}</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div v-for="n in 5" :key="n" class="px-5 py-4 border-b border-slate-100 last:border-0 animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-slate-200 rounded-full shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-3 bg-slate-200 rounded-full w-1/4" />
            <div class="h-2.5 bg-slate-100 rounded-full w-1/3" />
          </div>
          <div class="w-20 h-6 bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="filteredBookings.length === 0" class="bg-white rounded-2xl border border-slate-200/80 py-20 text-center">
      <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="font-semibold text-slate-900 mb-1 text-sm">No bookings found</h3>
      <p class="text-slate-500 text-sm">
        {{ search || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Bookings will appear here once guests start booking' }}
      </p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Guest</th>
              <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tour</th>
              <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
              <th class="text-center px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pax</th>
              <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th class="text-right px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="booking in filteredBookings"
              :key="booking.id"
              class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors group"
            >
              <!-- Guest -->
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    :class="avatarColor(booking.name)"
                  >
                    {{ getInitials(booking.name) }}
                  </div>
                  <div>
                    <div class="font-medium text-slate-900 text-xs leading-tight">{{ booking.name }}</div>
                    <div class="text-[10px] text-slate-400 leading-tight mt-0.5">{{ booking.email }}</div>
                  </div>
                </div>
              </td>

              <!-- Tour -->
              <td class="px-5 py-3.5 max-w-[160px]">
                <span class="text-xs text-slate-500 line-clamp-2 leading-relaxed">{{ booking.tours?.title ?? '—' }}</span>
              </td>

              <!-- Date -->
              <td class="px-5 py-3.5 whitespace-nowrap">
                <span class="text-xs text-slate-500">{{ formatDate(booking.date) }}</span>
              </td>

              <!-- Pax -->
              <td class="px-5 py-3.5 text-center">
                <span class="text-sm font-semibold text-slate-700">{{ booking.guests }}</span>
              </td>

              <!-- Status -->
              <td class="px-5 py-3.5">
                <AdminBookingStatusBadge :status="booking.status" />
              </td>

              <!-- Actions -->
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    v-if="booking.status !== 'confirmed'"
                    class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'confirmed')"
                  >
                    Confirm
                  </button>
                  <button
                    v-if="booking.status !== 'pending'"
                    class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'pending')"
                  >
                    Pending
                  </button>
                  <button
                    v-if="booking.status !== 'cancelled'"
                    class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'cancelled')"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <p class="text-xs text-slate-400">Showing {{ filteredBookings.length }} of {{ bookings.length }} bookings</p>
        <p v-if="statusFilter !== 'all'" class="text-xs text-slate-400">
          Filtered by <span class="font-medium text-slate-600">{{ statusFilter }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Booking, BookingStatus } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { fetchBookings, updateBookingStatus } = useBookings()
const { formatDate, avatarColor, getInitials } = useFormatting()

const bookings = ref<Booking[]>([])
const loading = ref(true)
const loadError = ref<string | null>(null)
const updateError = ref<string | null>(null)
const statusFilter = ref<'all' | BookingStatus>('all')
const search = ref('')
const updatingId = ref<string | null>(null)

onMounted(async () => {
  try {
    bookings.value = await fetchBookings()
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : 'Failed to load bookings'
  } finally {
    loading.value = false
  }
})

const countByStatus = (status: BookingStatus) =>
  bookings.value.filter((b) => b.status === status).length

const filterOptions = computed(() => [
  { value: 'all', label: 'All', count: bookings.value.length, activeClass: 'bg-slate-900 text-white border-slate-900' },
  { value: 'pending', label: 'Pending', count: countByStatus('pending'), activeClass: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'confirmed', label: 'Confirmed', count: countByStatus('confirmed'), activeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { value: 'cancelled', label: 'Cancelled', count: countByStatus('cancelled'), activeClass: 'bg-red-100 text-red-700 border-red-200' },
] as const)

const filteredBookings = computed(() =>
  bookings.value
    .filter((b) => statusFilter.value === 'all' || b.status === statusFilter.value)
    .filter((b) => {
      if (!search.value) return true
      const q = search.value.toLowerCase()
      return (
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.includes(q)
      )
    })
)

const updateStatus = async (id: string, status: BookingStatus) => {
  updatingId.value = id
  updateError.value = null
  try {
    await updateBookingStatus(id, status)
    const booking = bookings.value.find((b) => b.id === id)
    if (booking) booking.status = status
  } catch (e) {
    updateError.value = e instanceof Error ? e.message : 'Failed to update booking status'
  } finally {
    updatingId.value = null
  }
}
</script>
