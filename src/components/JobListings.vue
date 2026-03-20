<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase';
import JobListing from './JobListing.vue';

import LoadingState from '@/components/LoadingState.vue';

interface Props {
  limit?: number;
  showButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  limit: undefined,
  showButton: false
});

const JOBS_PER_PAGE = 6;

const state = reactive({
  jobs: [] as any[],
  isLoading: true,
  isFetchingMore: false,
  page: 0,
  isFinished: false,
});

const fetchJobs = async (isFirstLoad = true) => {
  // 1. If we have a limit and we've already reached it, don't fetch more
  if (props.limit && state.jobs.length >= props.limit) {
    state.isFinished = true;
    return;
  }

  if (state.isFinished && !isFirstLoad) return;

  // 2. Calculate range. If limit is 3, we only fetch 3.
  const from = state.page * JOBS_PER_PAGE;
  const requestedTo = from + JOBS_PER_PAGE - 1;

  // Ensure we don't fetch more than the limit prop allows
  const to = props.limit ? Math.min(requestedTo, props.limit - 1) : requestedTo;

  if (isFirstLoad) state.isLoading = true;
  else state.isFetchingMore = true;

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(*)')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // 3. Mark as finished if we got less than requested or reached the limit
    if (data.length < JOBS_PER_PAGE || (props.limit && state.jobs.length + data.length >= props.limit)) {
      state.isFinished = true;
    }

    state.jobs = [...state.jobs, ...data];
    state.page++;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    state.isLoading = false;
    state.isFetchingMore = false;
  }
};

const handleScroll = () => {
  // Disable infinite scroll if a limit is set (e.g., on the Homepage)
  if (props.limit) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100 && !state.isFetchingMore) {
    fetchJobs(false);
  }
};

onMounted(() => {
  fetchJobs();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <section class="bg-slate-50 px-4 py-16">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center mb-12">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-2">
          Browse <span class="text-indigo-600">Opportunities</span>
        </h2>
        <div class="h-1.5 w-20 bg-indigo-600 rounded-full"></div>
      </div>

      <LoadingState v-if="state.isLoading" />

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <JobListing
            v-for="job in state.jobs"
            :key="job.id"
            :job="job"
          />
        </div>

        <div v-if="state.isFetchingMore && !props.limit" class="mt-10 flex justify-center">
           <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div v-if="showButton && state.jobs.length > 0" class="mt-16 text-center">
          <RouterLink
            to="/jobs"
            class="inline-block px-10 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95"
          >
            View All Current Openings
          </RouterLink>
        </div>

        <div v-if="state.jobs.length === 0" class="text-center py-20">
          <p class="text-slate-500 text-lg italic">No jobs available at the moment.</p>
        </div>
      </div>
    </div>
  </section>
</template>
