<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';

const route = useRoute();

const isActiveLink = (routePath: string): boolean => {
  return route.path === routePath;
};
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <div class="flex items-center">
          <RouterLink class="group flex items-center gap-2" to="/">
            <img
              class="h-8 w-auto transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
              :src="logo"
              alt="Logo"
            />
            <span class="hidden text-xl font-bold tracking-tight text-slate-900 md:block">
              ስራ <span class="text-indigo-600">ላይ</span>
            </span>
          </RouterLink>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <RouterLink
            to="/"
            :class="[
              isActiveLink('/')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'
            ]"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/jobs"
            :class="[
              isActiveLink('/jobs')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'
            ]"
          >
            Jobs
          </RouterLink>

          <RouterLink
            to="/jobs/add"
            class="ml-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
          >
            Post a Job
          </RouterLink>
        </div>

      </div>
    </div>
  </nav>
</template>
