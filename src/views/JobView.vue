<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;

const state = reactive({
  job: null as any, // Will hold our job + company data
  isLoading: true,
});

const fetchJob = async () => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(*)')
      .eq('id', jobId)
      .single(); // We only expect one result

    if (error) throw error;
    state.job = data;
  } catch (error) {
    console.error('Error fetching job:', error);
    toast.error('Could not load job details');
  } finally {
    state.isLoading = false;
  }
};

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast.success('Job Deleted Successfully');
      router.push('/jobs');
    }
  } catch (error) {
    console.error('Error deleting job', error);
    toast.error('Job Not Deleted');
  }
};

onMounted(() => {
  fetchJob();
});
</script>

<template>
  <main class="bg-slate-50 min-h-screen pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <BackButton />

      <div v-if="state.isLoading" class="flex justify-center items-center py-20">
        <PulseLoader color="#4f46e5" />
      </div>

      <div v-else-if="state.job" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">

        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
              {{ state.job.type }}
            </span>
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-4">
              {{ state.job.title }}
            </h1>
            <div class="flex items-center text-orange-600 font-medium">
              <span class="mr-2 text-xl">📍</span>
              {{ state.job.location }}
            </div>
          </div>

          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-4 border-b border-slate-50 pb-2">
              Job Description
            </h3>
            <p class="text-slate-600 leading-relaxed mb-6">
              {{ state.job.description }}
            </p>

            <h3 class="text-xl font-bold text-slate-900 mb-2">Salary</h3>
            <p class="text-emerald-600 text-xl font-bold">{{ state.job.salary }} <span class="text-sm text-slate-400 font-normal">/ Year</span></p>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Company Info</h3>

            <h2 class="text-2xl font-black text-slate-900 mb-3">{{ state.job.companies?.name }}</h2>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              {{ state.job.companies?.description }}
            </p>

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

          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-6">Admin Panel</h3>
            <div class="space-y-3">
              <RouterLink
                :to="`/jobs/edit/${state.job.id}`"
                class="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                Edit Job
              </RouterLink>
              <button
                @click="deleteJob"
                class="block w-full text-center py-3 bg-white border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
              >
                Delete Job
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-slate-500 text-lg">Job not found.</p>
        <RouterLink to="/jobs" class="text-indigo-600 font-bold hover:underline">Return to listings</RouterLink>
      </div>
    </div>
  </main>
</template>
