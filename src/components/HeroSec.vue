<script setup lang="ts">
// Using a TS interface for props is much cleaner
interface Props {
  title?: string;
  subtitle?: string;
}

// withDefaults allows us to set the "fallback" values in a TS-friendly way
const props = withDefaults(defineProps<Props>(), {
  title: 'Elevate Your Career',
  subtitle: 'Connecting extraordinary talent with the nation’s most innovative companies.'
  });
</script>

<template>
  <section class="relative overflow-hidden bg-slate-900 py-24 mb-10">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-500 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-500 blur-[120px]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center max-w-3xl">
        <h1 class="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
          <span class="block mb-2">{{ props.title.split(' ')[0] }}</span>
          <span class="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            {{ props.title.split(' ').slice(1).join(' ') }}
          </span>
        </h1>

        <p class="mt-6 text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
          {{ props.subtitle }}
        </p>

        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <button class="px-8 py-3 bg-gradient-to-r from-indigo-400 to-emerald-400 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            Get Started
          </button>
          <button class="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
