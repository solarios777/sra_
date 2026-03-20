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
  <div class="min-h-screen bg-[#e2e8f0] flex items-center justify-center p-4 font-sans">
    <div class="relative w-full max-w-[850px] min-h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row">

      <div class="relative w-full h-full flex flex-col md:flex-row min-h-[550px]">

        <div class="w-full md:w-1/2 p-0 flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out"
             :class="isLogin ? 'opacity-0 invisible' : 'opacity-100 visible'">
          <h2 class="text-3xl font-black text-slate-800 mb-6">Registration</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-4 max-w-xs">
            <div class="relative">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
              <input v-model="form.username" type="text" placeholder="Username" class="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all" />
            </div>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
              <input v-model="form.email" type="email" placeholder="Email" class="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all" />
            </div>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
              <input v-model="form.password" type="password" placeholder="Password" class="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all" />
            </div>
            <button class="w-full bg-[#800080] text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-800 transition-all shadow-lg active:scale-95">register</button>
          </form>
          <p class="mt-6 text-slate-400 text-sm">or register with social platforms</p>
          <div class="flex gap-3 mt-4">
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Chrome :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Facebook :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Github :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Linkedin :size="18" /></button>
          </div>
        </div>

        <div class="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out"
             :class="isLogin ? 'opacity-100 visible' : 'opacity-0 invisible'">
          <h2 class="text-3xl font-black text-slate-800 mb-6">Login</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-4 max-w-xs">
            <div class="relative">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
              <input v-model="form.email" type="email" placeholder="Username" class="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all" />
            </div>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
              <input v-model="form.password" type="password" placeholder="Password" class="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-400 transition-all" />
            </div>
            <button type="button" class="text-xs text-slate-500 hover:text-[#800080] block w-full text-center">Forgot password?</button>
            <button class="w-full bg-[#800080] text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-800 transition-all shadow-lg active:scale-95">Login</button>
          </form>
          <p class="mt-6 text-slate-400 text-sm">or login with social platforms</p>
          <div class="flex gap-3 mt-4">
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Chrome :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Facebook :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Github :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"><Linkedin :size="18" /></button>
          </div>
        </div>
      </div>

     <div
  class="absolute top-0 left-0 w-full md:w-1/2 h-1/2 md:h-full bg-[#800080] transition-all duration-[800ms] ease-in-out z-20 flex items-center justify-center p-10 text-white text-center"
  :class="[
    isLogin
      ? 'translate-y-0 md:translate-x-0 rounded-b-[50px] md:rounded-b-none md:rounded-r-[150px]'
      : 'translate-y-full md:translate-y-0 md:translate-x-full rounded-t-[50px] md:rounded-t-none md:rounded-l-[150px]'
  ]"
>
        <div class="transition-all duration-500">
          <h2 class="text-3xl font-bold mb-2">
            {{ isLogin ? 'Hello, Welcome!' : 'Welcome Back!' }}
          </h2>
          <p class="mb-8 font-medium opacity-80">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          </p>
          <button
            @click="isLogin = !isLogin"
            class="px-12 py-2 border-2 border-white rounded-xl font-bold uppercase text-sm hover:bg-white hover:text-[#800080] transition-all active:scale-95"
          >
            {{ isLogin ? 'Register' : 'login' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

