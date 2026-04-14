<template>
  <div class="bg-white rounded-3xl overflow-hidden shadow-card">
    <!-- Image skeleton -->
    <div class="shimmer bg-slate-200" style="aspect-ratio: 3/2" />
    <!-- Content skeleton -->
    <div class="p-5 space-y-3.5">
      <div class="h-2.5 shimmer bg-slate-200 rounded-full w-1/3" />
      <div class="h-4 shimmer bg-slate-200 rounded-full w-4/5" />
      <div class="space-y-2">
        <div class="h-3 shimmer bg-slate-200 rounded-full w-full" />
        <div class="h-3 shimmer bg-slate-200 rounded-full w-3/4" />
      </div>
      <div class="flex items-center justify-between pt-3.5 border-t border-slate-100">
        <div class="h-3 shimmer bg-slate-200 rounded-full w-24" />
        <div class="w-8 h-8 shimmer bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
</template>
