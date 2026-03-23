<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import BackButton from '@/components/BackButton.vue';
import JobActions from '@/components/JobActions.vue';
import LoadingState from '@/components/LoadingState.vue';
import { MapPin } from 'lucide-vue-next';

const route = useRoute();
const toast = useToast();
const jobId = route.params.id;

const state = reactive({
  job: null as any,
  isLoading: true,
  isOwner: false, // New state to track ownership
});

onMounted(async () => {
  try {
    // 1. Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Fetch the job details
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(*)')
      .eq('id', jobId)
      .single();

    if (error) throw error;

    state.job = data;

    // 3. Check if the logged-in user matches the person who posted the job
    // Note: This assumes your 'jobs' table has a column named 'user_id'
    if (user && data && user.id === data.user_id) {
      state.isOwner = true;
    }

  } catch (error) {
    toast.error('Could not load job details');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <main class="bg-slate-50 min-h-screen pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton />

      <LoadingState v-if="state.isLoading" />

      <div v-else-if="state.job" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
              {{ state.job.type }}
            </span>
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-4">{{ state.job.title }}</h1>
            <div class="flex items-center text-orange-600 font-medium">
              <MapPin :size="18" class="mr-1" /> {{ state.job.location }}
            </div>
          </div>

          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-4 border-b border-slate-50 pb-2">Job Description</h3>
            <p class="text-slate-600 leading-relaxed mb-6">{{ state.job.description }}</p>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Salary</h3>
            <p class="text-emerald-600 text-xl font-bold">{{ state.job.salary }}</p>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Company Info</h3>
            <h2 class="text-2xl font-black text-slate-900 mb-3">{{ state.job.companies?.name }}</h2>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">{{ state.job.companies?.description }}</p>

            <div class="space-y-4">
              <div class="p-4 bg-slate-50 rounded-xl">
                <p class="text-xs text-slate-500 font-bold uppercase mb-1">Email</p>
                <p class="text-slate-900 font-medium break-words">{{ state.job.companies?.contact_email }}</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                <p class="text-xs text-slate-500 font-bold uppercase mb-1">Phone</p>
                <p class="text-slate-900 font-medium">{{ state.job.companies?.contact_phone }}</p>
              </div>
            </div>
          </div>

          <JobActions v-if="state.isOwner" :jobId="state.job.id" />
        </aside>
      </div>
    </div>
  </main>
</template>
