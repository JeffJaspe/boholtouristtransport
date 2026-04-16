<template>
  <div class="max-w-7xl mx-auto">
    <!-- Load error -->
    <div v-if="loadError" class="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ loadError }}
    </div>

    <!-- Greeting header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p class="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">{{ today }}</p>
        <h1 class="text-2xl font-bold text-slate-900">{{ greeting }}, Admin</h1>
        <p class="text-slate-500 text-sm mt-0.5">Here's what's happening with your tours today.</p>
      </div>
      <NuxtLink
        to="/admin/tours/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Tour
      </NuxtLink>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <AdminStatCard
        label="Total Tours"
        :value="stats.tours"
        sub="Active packages"
        icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        color="ocean"
      />
      <AdminStatCard
        label="Total Bookings"
        :value="stats.bookings"
        sub="All time"
        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        color="violet"
      />
      <AdminStatCard
        label="Pending"
        :value="stats.pending"
        sub="Need attention"
        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        color="amber"
      />
      <AdminStatCard
        label="Confirmed"
        :value="stats.confirmed"
        sub="Ready to go"
        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        color="emerald"
      />
    </div>

    <div class="grid lg:grid-cols-5 gap-6">
      <!-- Recent bookings -->
      <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 class="font-semibold text-slate-900 text-sm">Recent Bookings</h2>
          <NuxtLink to="/admin/bookings" class="text-xs text-ocean-600 hover:text-ocean-700 font-medium flex items-center gap-1">
            View all
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="loadingBookings" class="p-5 space-y-3">
          <div v-for="n in 4" :key="n" class="h-12 bg-slate-100 rounded-xl animate-pulse" />
        </div>

        <div v-else-if="recentBookings.length === 0" class="py-16 text-center text-slate-400 text-sm">
          No bookings yet. Share your tours to get started!
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Guest</th>
                <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tour</th>
                <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                <th class="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="booking in recentBookings"
                :key="booking.id"
                class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
              >
                <td class="px-5 py-3.5">
                  <div class="flex items-center gap-2.5">
                    <!-- Avatar initials -->
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" :class="avatarColor(booking.name)">
                      {{ getInitials(booking.name) }}
                    </div>
                    <div>
                      <div class="font-medium text-slate-900 text-xs leading-tight">{{ booking.name }}</div>
                      <div class="text-[10px] text-slate-400">{{ booking.guests }} guest{{ booking.guests !== 1 ? 's' : '' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-3.5 text-xs text-slate-500 max-w-[140px]">
                  <span class="line-clamp-2 leading-relaxed">{{ booking.tours?.title ?? '—' }}</span>
                </td>
                <td class="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">{{ formatDate(booking.date) }}</td>
                <td class="px-5 py-3.5">
                  <AdminBookingStatusBadge :status="booking.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right column -->
      <div class="lg:col-span-2 space-y-5">
        <!-- Booking breakdown with bar chart -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-5">
          <h2 class="font-semibold text-slate-900 text-sm mb-4">Booking Breakdown</h2>

          <div v-if="stats.bookings === 0" class="text-center py-6 text-slate-400 text-xs">
            No data yet
          </div>

          <div v-else class="space-y-3">
            <div v-for="item in breakdownItems" :key="item.label">
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full shrink-0" :class="item.dot" />
                  <span class="text-xs text-slate-600 font-medium">{{ item.label }}</span>
                </div>
                <span class="text-xs font-bold text-slate-800">{{ item.count }}</span>
              </div>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="item.bar"
                  :style="{ width: stats.bookings > 0 ? `${(item.count / stats.bookings) * 100}%` : '0%' }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-5">
          <h2 class="font-semibold text-slate-900 text-sm mb-3">Quick Actions</h2>
          <div class="space-y-1">
            <NuxtLink
              to="/admin/tours/create"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ocean-50 text-slate-600 hover:text-ocean-700 transition-colors group"
            >
              <div class="w-7 h-7 bg-ocean-100 rounded-lg flex items-center justify-center group-hover:bg-ocean-200 transition-colors shrink-0">
                <svg class="w-3.5 h-3.5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span class="text-sm font-medium">Add New Tour</span>
              <svg class="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-ocean-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>

            <NuxtLink
              to="/admin/tours"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors group"
            >
              <div class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors shrink-0">
                <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span class="text-sm font-medium">Manage Tours</span>
              <svg class="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>

            <NuxtLink
              to="/admin/bookings"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors group"
            >
              <div class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors shrink-0">
                <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span class="text-sm font-medium">View Bookings</span>
              <svg class="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
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
const { formatDate, avatarColor, getInitials } = useFormatting()

const recentBookings = ref<Booking[]>([])
const loadingBookings = ref(true)
const loadError = ref<string | null>(null)
const stats = reactive({ tours: 0, bookings: 0, pending: 0, confirmed: 0 })

onMounted(async () => {
  try {
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
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : 'Failed to load dashboard data'
  } finally {
    loadingBookings.value = false
  }
})

const breakdownItems = computed(() => [
  { label: 'Confirmed', count: stats.confirmed, dot: 'bg-emerald-500', bar: 'bg-emerald-500' },
  { label: 'Pending', count: stats.pending, dot: 'bg-amber-400', bar: 'bg-amber-400' },
  {
    label: 'Cancelled',
    count: Math.max(0, stats.bookings - stats.pending - stats.confirmed),
    dot: 'bg-red-400',
    bar: 'bg-red-400',
  },
])

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const today = computed(() =>
  new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
)
</script>
