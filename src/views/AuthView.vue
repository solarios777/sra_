<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Login from '@/components/auth/SignIn.vue'
import Register from '@/components/auth/SignUp.vue';

const route = useRoute();
const isLogin = ref(true);

// We'll pass the redirect path down to the children
const redirectTo = ref<string>('/');

onMounted(() => {
  if (route.query.redirect) {
    redirectTo.value = route.query.redirect as string;
  }
});
</script>

<template>
  <div class="h-full bg-[#f8fafc] flex items-center justify-center px-4 pt-10 pb-20 font-sans overflow-hidden">
    <div class="relative w-full max-w-[750px] h-[75vh] md:h-[500px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

      <div class="relative w-full h-full flex flex-col md:flex-row">
        <Register
          :is-visible="!isLogin"
          :redirect-path="redirectTo"
        />

        <Login
          :is-visible="isLogin"
          :redirect-path="redirectTo"
        />
      </div>

      <div
        class="absolute left-0 w-full md:w-1/2 h-[25%] md:h-full bg-slate-900 transition-all duration-[800ms] ease-in-out z-20 flex items-center justify-center p-6 text-white text-center"
        :class="[
          isLogin
            ? 'top-0 md:translate-x-0 rounded-b-[40px] md:rounded-b-none md:rounded-r-[150px]'
            : 'top-[75%] md:top-0 md:translate-x-full rounded-t-[40px] md:rounded-t-none md:rounded-l-[150px]'
        ]"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            {{ isLogin ? 'Hello, Welcome!' : 'Welcome back!' }}
          </h2>
          <p class="mb-4 md:mb-8 text-sm font-medium opacity-80">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          </p>
          <button @click="isLogin = !isLogin" class="mt-2 px-10 py-2 border-2 border-white rounded-xl font-bold uppercase text-xs hover:bg-white hover:text-indigo-600 transition-all active:scale-95">
            {{ isLogin ? 'Register' : 'Login' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
