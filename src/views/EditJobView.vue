<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;

const state = reactive({
  isLoading: true,
  isUpdating: false,
  companyId: '', // To keep track of the linked company
});

const form = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  salary: '',
  location: '',
  companyName: '',
  companyDescription: '',
  contactEmail: '',
  contactPhone: '',
});

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(*)')
      .eq('id', jobId)
      .single();

    if (error) throw error;

    // Populate the form with current data
    form.type = data.type;
    form.title = data.title;
    form.description = data.description;
    form.salary = data.salary;
    form.location = data.location;

    if (data.companies) {
      state.companyId = data.companies.id;
      form.companyName = data.companies.name;
      form.companyDescription = data.companies.description;
      form.contactEmail = data.companies.contact_email;
      form.contactPhone = data.companies.contact_phone;
    }
  } catch (error) {
    console.error('Error fetching job:', error);
    toast.error('Could not load job data');
  } finally {
    state.isLoading = false;
  }
});

const handleSubmit = async () => {
  state.isUpdating = true;
  try {
    // 1. Update Company Info
    const { error: companyError } = await supabase
      .from('companies')
      .update({
        name: form.companyName,
        description: form.companyDescription,
        contact_email: form.contactEmail,
        contact_phone: form.contactPhone,
      })
      .eq('id', state.companyId);

    if (companyError) throw companyError;

    // 2. Update Job Info
    const { error: jobError } = await supabase
      .from('jobs')
      .update({
        title: form.title,
        type: form.type,
        location: form.location,
        description: form.description,
        salary: form.salary,
      })
      .eq('id', jobId);

    if (jobError) throw jobError;

    toast.success('Job Updated Successfully');
    router.push(`/jobs/${jobId}`);
  } catch (error) {
    console.error('Update error:', error);
    toast.error('Failed to update job');
  } finally {
    state.isUpdating = false;
  }
};
</script>

<template>
  <main class="bg-slate-50 min-h-screen pb-1">
    <div class="max-w-3xl mx-auto px-4 py-1">
      <BackButton />

     
       <div v-if="state.isLoading" class="flex flex-col items-center justify-center py-20 w-full">
    <div class="relative">
      <div class="w-12 h-12 border-4 border-slate-200 rounded-full"></div>
      <div class="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p class="mt-4 text-slate-500 font-medium animate-pulse">Loading opportunities...</p>
  </div>
      <div v-else class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div class="bg-slate-900 p-8 text-white">
          <h2 class="text-2xl font-black">Edit Listing</h2>
          <p class="text-slate-400 text-sm mt-1">Update the details for your job post</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">Job Details</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Job Type</label>
                <select v-model="form.type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Salary Range</label>
                <select v-model="form.salary" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - $70K">$50K - $70K</option>
                  <option value="$70K - $100K">$70K - $100K</option>
                  <option value="$100K - $150K">$100K - $150K</option>
                  <option value="Over $150K">Over $150K</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
              <input v-model="form.title" type="text" placeholder="e.g. Senior Frontend Engineer" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <input v-model="form.location" type="text" placeholder="e.g. Addis Ababa, Ethiopia" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
              <textarea v-model="form.description" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Outline responsibilities and requirements..."></textarea>
            </div>
          </div>

          <div class="space-y-4 pt-6 border-t border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 border-l-4 border-orange-500 pl-3">Company Information</h3>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
              <input v-model="form.companyName" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Company Description</label>
              <textarea v-model="form.companyDescription" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Contact Email</label>
                <input v-model="form.contactEmail" type="email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                <input v-model="form.contactPhone" type="tel" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="state.isUpdating"
            class="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 active:scale-[0.98]"
          >
            {{ state.isUpdating ? 'Saving Changes...' : 'Save Job Details' }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
