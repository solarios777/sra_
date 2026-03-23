<script setup lang="ts">
import { reactive, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Mail, Lock,  } from 'lucide-vue-next';

const props = defineProps<{ isVisible: boolean; redirectPath: string }>();
const router = useRouter();
const toast = useToast();
const isLoading = ref(false);

const form = reactive({ email: '', password: '' });

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) throw error;

    toast.success('Welcome Back!');
    // Redirect to the intended page or home
    router.push(props.redirectPath);
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="w-full md:w-1/2 transition-all duration-700 ease-in-out flex flex-col items-center text-center p-8 md:p-10"
    :class="[isVisible ? 'opacity-100 visible h-[95%] md:h-full justify-center' : 'opacity-0 invisible h-0 md:h-full']"
  >
    <h2 class="text-2xl md:text-3xl font-black text-slate-900 mt-38 md:mt-0">Login</h2>
    <form @submit.prevent="handleLogin" class="w-full space-y-4 max-w-xs flex-grow flex flex-col justify-center">
      <div class="space-y-3">
        <div class="relative">
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input v-model="form.email" type="email" placeholder="Email" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" required />
        </div>
        <div class="relative">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input v-model="form.password" type="password" placeholder="Password" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" required />
        </div>
      </div>
      <button :disabled="isLoading" class="w-full bg-[#0f172a] text-white py-3 mt-2 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50">
        {{ isLoading ? 'Loading...' : 'Login' }}
      </button>
    </form>
    </div>
</template>
