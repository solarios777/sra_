<script setup lang="ts">
import { AlertTriangle, Trash2, X } from 'lucide-vue-next';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-red-50 rounded-2xl text-red-600">
            <AlertTriangle :size="24" />
          </div>
          <button @click="emit('close')" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X :size="20" />
          </button>
        </div>

        <h3 class="text-xl font-black text-slate-900 mb-2">Delete Job?</h3>
        <p class="text-slate-500 leading-relaxed">
          This action cannot be undone. This will permanently remove the job listing from the platform.
        </p>
      </div>

      <div class="bg-slate-50 p-6 flex gap-3">
        <button
          @click="emit('close')"
          class="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 :size="18" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
