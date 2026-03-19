<script setup lang="ts">
import { reactive} from 'vue';
import { RouterLink } from 'vue-router';
import jobData from '@/jobs.json';
import JobListing from './JobListing.vue';

interface Props {
  limit?: number;
  showButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  limit: undefined,
  showButton: false
});

// Define the State
interface JobState {
  jobs: any[];
  isLoading: boolean;
}

const state = reactive<JobState>({
  // FIX: Access the .jobs property from your JSON file
  jobs: jobData.jobs,
  isLoading: false,
});
</script>

<template>
  <section class="bg-slate-50 px-4 py-16">
    <div class="max-w-7xl mx-auto">

      <div class="flex flex-col items-center mb-12">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-2">
          Browse <span class="text-indigo-600">Opportunities</span>
        </h2>
        <p class="text-slate-500 mb-6 font-medium">Find your next career move</p>
        <div class="h-1.5 w-20 bg-indigo-600 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>

      <div v-if="state.jobs.length === 0" class="text-center py-20">
        <p class="text-slate-500 text-lg italic">No jobs available at the moment.</p>
      </div>

      <div v-if="showButton" class="mt-16 text-center">
        <RouterLink
          to="/jobs"
          class="inline-block px-10 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95"
        >
          View All Current Openings
        </RouterLink>
      </div>
    </div>
  </section>
</template>
