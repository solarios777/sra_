<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center bg-slate-50">
    <div class="relative">
      <h1 class="text-[120px] md:text-[180px] font-black tracking-tighter text-indigo-600/10 leading-none select-none">
        404
      </h1>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Oops!
        </span>
      </div>
    </div>

    <div class="max-w-md mt-4">
      <h2 class="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p class="text-slate-500 mb-8 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
    </div>

    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
    >
      <span class="text-lg">Back to Home</span>
    </RouterLink>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 blur-[100px] pointer-events-none -z-10"></div>
  </section>
</template>

<style scoped>
/* Optional: Adding a slight 'float' animation to the 404 text like the isometric image */
h1 {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
