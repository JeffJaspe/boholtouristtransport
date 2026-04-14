<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
    :class="styles[status]"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="dot[status]" />
    {{ label[status] }}
  </span>
</template>

<script setup lang="ts">
import type { BookingStatus } from '~/types'

defineProps<{ status: BookingStatus }>()

const styles: Record<BookingStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border border-green-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
}

const dot: Record<BookingStatus, string> = {
  pending: 'bg-amber-500',
  confirmed: 'bg-green-500',
  cancelled: 'bg-red-500',
}

const label: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}
</script>
