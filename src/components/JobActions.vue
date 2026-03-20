<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';
import DeleteModal from './DeleteModal.vue';

const props = defineProps<{ jobId: string }>();
const router = useRouter();
const toast = useToast();

const isModalOpen = ref(false);

const handleDelete = async () => {
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', props.jobId);
    if (error) throw error;

    toast.success('Job Removed Successfully');
    router.push('/jobs');
  } catch (error) {
    toast.error('Failed to delete job');
    console.error(error);
  } finally {
    isModalOpen.value = false;
  }
};
</script>

<template>
  <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
    <h3 class="text-lg font-bold text-slate-900 mb-6">Admin Panel</h3>
    <div class="space-y-3">
      <RouterLink
        :to="`/jobs/edit/${jobId}`"
        class="block w-full text-center py-3 bg-gradient-to-r from-indigo-400 to-emerald-400 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
      >
        Edit Job
      </RouterLink>

      <button
        @click="isModalOpen = true"
        class="block w-full text-center py-3 bg-white border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
      >
        Delete Job
      </button>
    </div>

    <DeleteModal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      @confirm="handleDelete"
    />
  </div>
</template>
