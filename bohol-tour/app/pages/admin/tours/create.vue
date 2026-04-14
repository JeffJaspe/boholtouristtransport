<template>
  <div class="max-w-2xl">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink
        to="/admin/tours"
        class="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Create New Tour</h1>
        <p class="text-slate-500 text-sm">Fill in the details below to add a new tour package</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
      <AdminTourForm />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>
