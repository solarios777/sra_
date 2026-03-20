<script setup lang="ts">
import { ref, reactive } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Mail, Lock, User, Github, Facebook, Linkedin, Chrome } from 'lucide-vue-next';

const router = useRouter();
const toast = useToast();
const isLogin = ref(true);
const isLoading = ref(false);

const form = reactive({
  email: '',
  password: '',
  username: ''
});

const handleAuth = async () => {
  isLoading.value = true;
  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      toast.success('Welcome Back!');
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { username: form.username } }
      });
      if (error) throw error;
      toast.info('Check your email to confirm registration!');
    }
    router.push('/');
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#e2e8f0] flex items-center justify-center p-4 font-sans overflow-hidden">

    <div class="relative w-full max-w-[850px] h-[85vh] md:min-h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row">

      <div class="relative w-full h-full flex flex-col md:flex-row">

        <div class="w-full md:w-1/2 h-full p-6 md:p-10 flex flex-col justify-center items-center text-center transition-all duration-700"
             :class="isLogin ? 'opacity-0 invisible' : 'opacity-100 visible'">
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 mb-4 md:mb-6">Registration</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-3 md:space-y-4 max-w-xs">
            <button class="w-full bg-[#800080] text-white py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95">register</button>
          </form>
          <div class="hidden sm:flex gap-3 mt-4">
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600"><Chrome :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600"><Facebook :size="18" /></button>
          </div>
        </div>

        <div class="w-full md:w-1/2 h-full p-6 md:p-10 flex flex-col justify-center items-center text-center transition-all duration-700"
             :class="isLogin ? 'opacity-100 visible' : 'opacity-0 invisible'">
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 mb-4 md:mb-6">Login</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-3 md:space-y-4 max-w-xs">
            <button class="w-full bg-[#800080] text-white py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95">Login</button>
          </form>
        </div>
      </div>

      <div
        class="absolute left-0 w-full md:w-1/2 h-1/3 md:h-full bg-[#800080] transition-all duration-[800ms] ease-in-out z-20 flex items-center justify-center p-6 text-white text-center"
        :class="[
          isLogin
            ? 'top-0 md:translate-x-0 rounded-b-[40px] md:rounded-b-none md:rounded-r-[150px]'
            : 'top-[66.6%] md:top-0 md:translate-x-full rounded-t-[40px] md:rounded-t-none md:rounded-l-[150px]'
        ]"
      >
        <div class="transition-all duration-500 scale-90 md:scale-100">
          <h2 class="text-xl md:text-3xl font-bold mb-1">{{ isLogin ? 'Hello!' : 'Welcome Back!' }}</h2>
          <p class="mb-4 text-xs md:text-base opacity-80">{{ isLogin ? "No account?" : "Have an account?" }}</p>
          <button @click="isLogin = !isLogin" class="px-8 py-2 border-2 border-white rounded-xl font-bold uppercase text-xs">
            {{ isLogin ? 'Register' : 'login' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

