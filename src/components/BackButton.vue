<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="py-6">
    <div class="container m-auto px-6">
      <RouterLink
        to="/jobs"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm group"
      >
        <span class="text-lg group-hover:-translate-x-1 transition-transform">←</span>
        Back to Job Listings
      </RouterLink>
    </div>
  </section>
</template>
