<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow"
  >
    <div>
      <p class="text-sm font-medium text-slate-500 mb-1">{{ label }}</p>
      <p class="text-3xl font-bold text-slate-900 mb-1">{{ value }}</p>
      <p v-if="sub" class="text-xs text-slate-400">{{ sub }}</p>
    </div>
    <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="iconBg">
      <svg class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  sub?: string
  icon: string
  iconBg: string
  iconColor: string
}>()
</script>
