<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

// Define the structure of the Job prop
interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
}

const props = defineProps<{
  job: Job;
}>();

const showFullDescription = ref(false);

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  let desc = props.job.description;
  if (!showFullDescription.value && desc.length > 90) {
    desc = desc.substring(0, 90) + '...';
  }
  return desc;
});
</script>

<template>
  <div class="group bg-white rounded-2xl border border-slate-100 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 relative flex flex-col h-full">

    <div class="mb-4">
      <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
        {{ job.type }}
      </span>
      <h3 class="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {{ job.title }}
      </h3>
    </div>

    <div class="flex-grow mb-4">
      <p class="text-slate-600 text-sm leading-relaxed">
        {{ truncatedDescription }}
      </p>
      <button
        @click="toggleDescription"
        class="text-indigo-500 hover:text-indigo-700 text-xs font-semibold mt-2 underline-offset-4 hover:underline"
      >
        {{ showFullDescription ? 'Show Less' : 'Read More' }}
      </button>
    </div>

    <div class="pt-4 border-t border-slate-50 mt-auto">
      <div class="flex items-center justify-between mb-4">
        <span class="text-emerald-600 font-bold text-lg">{{ job.salary }}</span>
        <div class="flex items-center text-slate-400 text-sm">
          <span class="mr-1 text-orange-500">📍</span>
          {{ job.location }}
        </div>
      </div>

      <RouterLink
        :to="'/jobs/' + job.id"
        class="block w-full text-center py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-indigo-600 transition-all active:scale-95"
      >
        View Details
      </RouterLink>
    </div>
  </div>
</template>
