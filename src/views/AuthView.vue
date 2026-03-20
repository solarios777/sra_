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
  <div class="h-full bg-[#f8fafc] flex items-center justify-center px-4 pt-10 pb-20 font-sans overflow-hidden ">
    <div class="relative w-full max-w-[750px] h-[75vh] md:h-[500px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

      <div class="relative w-full h-full flex flex-col md:flex-row">

        <div
          class="w-full md:w-1/2 transition-all duration-700 ease-in-out flex flex-col items-center text-center p-0 md:p-10"
          :class="[
            isLogin ? 'opacity-0 invisible h-0  md:h-full' : 'opacity-100 visible h-[75%] mt-[5%] md:mt-0 md:h-full justify-center'
          ]"
        >
          <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-4 mt-0 md:mt-20">Create Account</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-4 max-w-xs flex-grow flex flex-col justify-center md:mb-4">
            <div class="space-y-3">
               <div class="relative">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                <input v-model="form.username" type="text" placeholder="Username" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                <input v-model="form.email" type="email" placeholder="Email" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                <input v-model="form.password" type="password" placeholder="Password" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
            </div>
            <button class="w-full bg-[#0f172a] text-white py-3 mt-6 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95">Register</button>
          </form>
          <div>
            <p class="text-slate-400 text-xs mb-2">or register with</p>
            <div class="flex gap-3 justify-center mb-20">
               <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Chrome :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Facebook :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Github :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Linkedin :size="18" /></button>
            </div>
          </div>
        </div>

        <div
          class="w-full md:w-1/2 transition-all duration-700 ease-in-out flex flex-col items-center text-center p-8 md:p-10"
          :class="[
            isLogin ? 'opacity-100 visible h-[95%] md:h-full justify-center' : 'opacity-0 invisible h-0 md:h-full'
          ]"
        >
          <h2 class="text-2xl md:text-3xl font-black text-slate-900 mt-38 md:mt-0">Login</h2>
          <form @submit.prevent="handleAuth" class="w-full space-y-4 max-w-xs flex-grow flex flex-col justify-center">
            <div class="space-y-3">
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                <input v-model="form.email" type="email" placeholder="Email" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                <input v-model="form.password" type="password" placeholder="Password" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
              <button type="button" class="text-xs text-blue-600 font-semibold hover:underline block w-full text-right">Forgot password?</button>
            </div>
            <button class="w-full bg-[#0f172a] text-white py-3 mt-2 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95">Login</button>
          </form>
          <div class="mt-4">
            <p class="text-slate-400 text-xs mb-2">or login with</p>
            <div class="flex gap-3 justify-center">
               <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Chrome :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Facebook :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Github :size="18" /></button>
             <button class="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50"><Linkedin :size="18" /></button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute left-0 w-full md:w-1/2 h-[25%] md:h-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-[800ms] ease-in-out z-20 flex items-center justify-center p-6 text-white text-center"
        :class="[
          isLogin
            ? 'top-0 md:translate-x-0 rounded-b-[40px] md:rounded-b-none md:rounded-r-[150px]'
            : 'top-[75%] md:top-0 md:translate-x-full rounded-t-[40px] md:rounded-t-none md:rounded-l-[150px]'
        ]"
      >
        <div class="transition-all duration-500">
          <h2 class="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            {{ isLogin ? 'Hello, Welcome!' : 'Welcome!' }}
          </h2>
          <p class="mb-4 md:mb-8 text-sm font-medium opacity-80">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          </p>
          <button @click="isLogin = !isLogin" class="mt-2 px-10 py-2 border-2 border-white rounded-xl font-bold uppercase text-xs hover:bg-white hover:text-blue-600 transition-all active:scale-95">
            {{ isLogin ? 'Register' : 'Login' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
