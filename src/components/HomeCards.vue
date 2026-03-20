<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from './CardCom.vue';
</script>

<template>
  <section class="py-12 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <Card bg="bg-indigo-50/50">
          <div class="flex flex-col h-full">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">For Job Seekers</h2>
            <p class="mt-3 mb-6 text-slate-600 leading-relaxed">
              Explore thousands of opportunities across various industries. Find the role that matches your expertise and passion.
            </p>
            <RouterLink
              to="/jobs"
              class="mt-auto inline-flex items-center justify-center w-fit px-6 py-2.5 bg-gradient-to-r from-indigo-400 to-emerald-400 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Explore All Jobs
            </RouterLink>
          </div>
        </Card>

        <Card bg="bg-emerald-50/50"> <div class="flex flex-col h-full">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">For Employers</h2>
            <p class="mt-3 mb-6 text-slate-600 leading-relaxed">
              Connect with top-tier talent. Post your openings to our global network and build your dream team today.
            </p>
            <RouterLink
              to="/jobs/add"
              class="mt-auto inline-flex items-center justify-center w-fit px-6 py-2.5 bg-gradient-to-r from-indigo-400 to-emerald-400 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
            >
              Post an Opening
            </RouterLink>
          </div>
        </Card>

      </div>
    </div>
  </section>
</template>
