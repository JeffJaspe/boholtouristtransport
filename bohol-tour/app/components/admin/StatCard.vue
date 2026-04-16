<template>
  <div class="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300/80 hover:shadow-md transition-all duration-200 group">
    <div class="flex items-start justify-between gap-3">
      <!-- Icon -->
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        :class="iconBgClass"
      >
        <svg class="w-5 h-5" :class="iconColorClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="icon" />
        </svg>
      </div>

      <!-- Trend badge -->
      <div
        v-if="trend !== undefined"
        class="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
        :class="trend >= 0
          ? 'bg-emerald-50 text-emerald-600'
          : 'bg-red-50 text-red-500'"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            :d="trend >= 0 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
          />
        </svg>
        {{ Math.abs(trend) }}%
      </div>
    </div>

    <div class="mt-4">
      <p class="text-2xl font-bold text-slate-900 leading-none tracking-tight">{{ value }}</p>
      <p class="text-sm font-medium text-slate-500 mt-1.5">{{ label }}</p>
      <p v-if="sub" class="text-xs text-slate-400 mt-1">{{ sub }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  sub?: string
  icon: string
  color?: 'ocean' | 'emerald' | 'amber' | 'violet' | 'rose'
  trend?: number
  // Legacy props (kept for backward compat)
  iconBg?: string
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), { color: 'ocean' })

const iconBgClass = computed(() => ({
  ocean: 'bg-gradient-to-br from-ocean-100 to-ocean-50',
  emerald: 'bg-gradient-to-br from-emerald-100 to-emerald-50',
  amber: 'bg-gradient-to-br from-amber-100 to-amber-50',
  violet: 'bg-gradient-to-br from-violet-100 to-violet-50',
  rose: 'bg-gradient-to-br from-rose-100 to-rose-50',
}[props.color ?? 'ocean']))

const iconColorClass = computed(() => ({
  ocean: 'text-ocean-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
  violet: 'text-violet-600',
  rose: 'text-rose-600',
}[props.color ?? 'ocean']))
</script>
