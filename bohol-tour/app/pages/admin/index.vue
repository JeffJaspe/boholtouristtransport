<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p class="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening with your tours.</p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
      <AdminStatCard
        label="Total Tours"
        :value="stats.tours"
        sub="Active tour packages"
        icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        icon-bg="bg-ocean-50"
        icon-color="text-ocean-600"
      />
      <AdminStatCard
        label="Total Bookings"
        :value="stats.bookings"
        sub="All time bookings"
        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        icon-bg="bg-teal-50"
        icon-color="text-teal-600"
      />
      <AdminStatCard
        label="Pending"
        :value="stats.pending"
        sub="Awaiting confirmation"
        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        icon-bg="bg-amber-50"
        icon-color="text-amber-600"
      />
      <AdminStatCard
        label="Confirmed"
        :value="stats.confirmed"
        sub="Ready to go"
        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        icon-bg="bg-green-50"
        icon-color="text-green-600"
      />
    </div>

    <div class="grid lg:grid-cols-5 gap-6">
      <!-- Recent bookings table -->
      <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 class="font-semibold text-slate-900">Recent Bookings</h2>
          <NuxtLink to="/admin/bookings" class="text-xs text-ocean-600 hover:underline font-medium">
            View all →
          </NuxtLink>
        </div>

        <div v-if="loadingBookings" class="p-6 space-y-3">
          <div v-for="n in 4" :key="n" class="h-12 bg-slate-100 rounded-xl animate-pulse" />
        </div>

        <div v-else-if="recentBookings.length === 0" class="py-16 text-center text-slate-400 text-sm">
          No bookings yet. Share your tours to get started!
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-100">
              <tr>
                <th class="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guest</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tour</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th class="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="font-medium text-slate-900">{{ booking.name }}</div>
                  <div class="text-xs text-slate-400">{{ booking.guests }} guest(s)</div>
                </td>
                <td class="px-6 py-4 text-slate-600">{{ booking.tours?.title ?? '—' }}</td>
                <td class="px-6 py-4 text-slate-600">{{ formatDate(booking.date) }}</td>
                <td class="px-6 py-4">
                  <AdminBookingStatusBadge :status="booking.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick links -->
      <div class="lg:col-span-2 space-y-5">
        <!-- Quick actions -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 class="font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <NuxtLink
              to="/admin/tours/create"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 transition-colors group"
            >
              <div class="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center group-hover:bg-ocean-200 transition-colors">
                <svg class="w-4 h-4 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span class="text-sm font-medium">Add New Tour</span>
            </NuxtLink>
            <NuxtLink
              to="/admin/tours"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 text-slate-700 hover:text-teal-700 transition-colors group"
            >
              <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span class="text-sm font-medium">Manage Tours</span>
            </NuxtLink>
            <NuxtLink
              to="/admin/bookings"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors group"
            >
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span class="text-sm font-medium">View All Bookings</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Booking breakdown -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 class="font-semibold text-slate-900 mb-4">Booking Breakdown</h2>
          <div class="space-y-3">
            <div v-for="item in breakdownItems" :key="item.label" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full shrink-0" :class="item.dot" />
              <div class="flex-1 text-sm text-slate-600">{{ item.label }}</div>
              <div class="font-bold text-slate-900 text-sm">{{ item.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Booking } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { fetchTours } = useTours()
const { fetchBookings, getBookingStats } = useBookings()

const recentBookings = ref<Booking[]>([])
const loadingBookings = ref(true)

const stats = reactive({ tours: 0, bookings: 0, pending: 0, confirmed: 0 })

onMounted(async () => {
  const [tours, bookings, bookingStats] = await Promise.all([
    fetchTours(false),
    fetchBookings(),
    getBookingStats(),
  ])

  stats.tours = tours.length
  stats.bookings = bookingStats.total
  stats.pending = bookingStats.pending
  stats.confirmed = bookingStats.confirmed

  recentBookings.value = bookings.slice(0, 5)
  loadingBookings.value = false
})

const breakdownItems = computed(() => [
  { label: 'Pending', count: stats.pending, dot: 'bg-amber-400' },
  { label: 'Confirmed', count: stats.confirmed, dot: 'bg-green-500' },
  { label: 'Cancelled', count: stats.bookings - stats.pending - stats.confirmed, dot: 'bg-red-400' },
])

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
</script>
