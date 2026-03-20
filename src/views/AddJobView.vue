<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import BackButton from '@/components/BackButton.vue';

const router = useRouter();
const toast = useToast();

const state = reactive({
  isSubmitting: false,
});

const form = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  salary: 'Under 10,000 ETB',
  location: '',
  companyName: '',
  companyDescription: '',
  contactEmail: '',
  contactPhone: '',
});

const handleSubmit = async () => {
  state.isSubmitting = true;
  try {
    // 1. Insert the Company first to get a company_id
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert([
        {
          name: form.companyName,
          description: form.companyDescription,
          contact_email: form.contactEmail,
          contact_phone: form.contactPhone,
        },
      ])
      .select()
      .single();

    if (companyError) throw companyError;

    // 2. Insert the Job using the ID from the company we just created
    const { data: jobData, error: jobError } = await supabase
      .from('jobs')
      .insert([
        {
          title: form.title,
          type: form.type,
          location: form.location,
          description: form.description,
          salary: form.salary,
          company_id: companyData.id,
        },
      ])
      .select()
      .single();

    if (jobError) throw jobError;

    toast.success('Job Posted Successfully!');
    router.push(`/jobs/${jobData.id}`);
  } catch (error) {
    console.error('Error adding job:', error);
    toast.error('Failed to post job. Please check your connection.');
  } finally {
    state.isSubmitting = false;
  }
};
</script>

<template>
  <main class="bg-slate-50 min-h-screen pb-12">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <BackButton />

      <div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div class="bg-indigo-600 p-8 text-white">
          <h2 class="text-2xl font-black">Post a New Job</h2>
          <p class="text-indigo-100 text-sm mt-1">Fill out the details to find your next great hire.</p>
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
                <label class="block text-sm font-bold text-slate-700 mb-2">Salary Range (ETB)</label>
                <select v-model="form.salary" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                  <option value="Under 10,000 ETB">Under 10,000 ETB</option>
                  <option value="10,000 - 20,000 ETB">10,000 - 20,000 ETB</option>
                  <option value="20,000 - 40,000 ETB">20,000 - 40,000 ETB</option>
                  <option value="40,000 - 60,000 ETB">40,000 - 60,000 ETB</option>
                  <option value="Over 60,000 ETB">Over 60,000 ETB</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
              <input v-model="form.title" type="text" placeholder="e.g. Senior Software Engineer" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <input v-model="form.location" type="text" placeholder="e.g. Addis Ababa, Bole" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
              <textarea v-model="form.description" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="What are the key responsibilities?"></textarea>
            </div>
          </div>

          <div class="space-y-4 pt-6 border-t border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 border-l-4 border-orange-500 pl-3">Company Information</h3>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
              <input v-model="form.companyName" type="text" placeholder="e.g. EthioTech" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Company Description</label>
              <textarea v-model="form.companyDescription" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Tell us about your company..."></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Contact Email</label>
                <input v-model="form.contactEmail" type="email" placeholder="hr@company.et" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                <input v-model="form.contactPhone" type="tel" placeholder="+251..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="state.isSubmitting"
            class="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 active:scale-[0.98]"
          >
            {{ state.isSubmitting ? 'Posting Job...' : 'Publish Listing' }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
