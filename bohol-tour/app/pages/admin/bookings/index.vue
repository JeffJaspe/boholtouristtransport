<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage Bookings</h1>
        <p class="text-slate-500 text-sm mt-1">{{ filteredBookings.length }} booking(s)</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Status filter -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="search"
            placeholder="Search guest..."
            class="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500 shadow-sm w-44"
          />
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-4">
      <div v-for="n in 5" :key="n" class="h-14 bg-slate-100 rounded-xl animate-pulse" />
    </div>

    <!-- Empty -->
    <div v-else-if="filteredBookings.length === 0" class="bg-white rounded-2xl border border-slate-100 shadow-sm py-24 text-center">
      <div class="text-5xl mb-4">📋</div>
      <h3 class="font-bold text-slate-900 mb-2">No bookings found</h3>
      <p class="text-slate-500 text-sm">{{ search || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Bookings will appear here once guests start booking' }}</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 border-b border-slate-100">
            <tr>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guest</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tour</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guests</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="font-medium text-slate-900">{{ booking.name }}</div>
                <div class="text-xs text-slate-400">{{ booking.email }}</div>
                <div class="text-xs text-slate-400">{{ booking.phone }}</div>
              </td>
              <td class="px-5 py-4 text-slate-600 max-w-[160px]">
                <span class="line-clamp-2 text-xs">{{ booking.tours?.title ?? '—' }}</span>
              </td>
              <td class="px-5 py-4 text-slate-600 whitespace-nowrap text-xs">{{ formatDate(booking.date) }}</td>
              <td class="px-5 py-4 text-center text-slate-700 font-semibold text-sm">{{ booking.guests }}</td>
              <td class="px-5 py-4">
                <AdminBookingStatusBadge :status="booking.status" />
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-1.5">
                  <button
                    v-if="booking.status !== 'confirmed'"
                    class="text-xs px-2.5 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-medium transition-colors"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'confirmed')"
                  >
                    Confirm
                  </button>
                  <button
                    v-if="booking.status !== 'cancelled'"
                    class="text-xs px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'cancelled')"
                  >
                    Cancel
                  </button>
                  <button
                    v-if="booking.status !== 'pending'"
                    class="text-xs px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg font-medium transition-colors"
                    :disabled="updatingId === booking.id"
                    @click="updateStatus(booking.id, 'pending')"
                  >
                    Pending
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination hint -->
      <div class="px-5 py-3 border-t border-slate-100 text-xs text-slate-400 text-right">
        Showing {{ filteredBookings.length }} of {{ bookings.length }} bookings
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Booking, BookingStatus } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { fetchBookings, updateBookingStatus } = useBookings()

const bookings = ref<Booking[]>([])
const loading = ref(true)
const statusFilter = ref<'all' | BookingStatus>('all')
const search = ref('')
const updatingId = ref<string | null>(null)

onMounted(async () => {
  try {
    bookings.value = await fetchBookings()
  } finally {
    loading.value = false
  }
})

const filteredBookings = computed(() => {
  return bookings.value
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
})

const updateStatus = async (id: string, status: BookingStatus) => {
  updatingId.value = id
  try {
    await updateBookingStatus(id, status)
    const booking = bookings.value.find((b) => b.id === id)
    if (booking) booking.status = status
  } finally {
    updatingId.value = null
  }
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
</script>
