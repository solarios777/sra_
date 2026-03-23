<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';
import { UserCircle, LogOut } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { onMounted, ref, computed } from 'vue';

const user = ref<any>(null);
const showDropdown = ref(false); // Toggle for the logout menu
const router = useRouter()
const route = useRoute();

const isActiveLink = (routePath: string): boolean => {
  return route.path === routePath;
};

// Get first letter of email or name
const userInitial = computed(() => {
  const email = user.value?.email || '';
  return email.charAt(0).toUpperCase();
});

const handlePostJobClick = async () => {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    router.push({
      path: '/signin',
      query: { redirect: '/jobs/add' }
    })
  } else {
    router.push('/jobs/add');
  }
}

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null;
  });
});

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    user.value = null;
    showDropdown.value = false;
    router.push('/signin');
  }
};
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <div class="flex items-center">
          <RouterLink class="group flex items-center gap-2" to="/">
            <img class="h-8 w-auto transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" :src="logo" alt="Logo" />
            <span class="hidden text-xl font-bold tracking-tight text-slate-900 md:block">
              ስራ <span class="text-indigo-600">ላይ</span>
            </span>
          </RouterLink>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900', 'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200']">
            Home
          </RouterLink>

          <RouterLink to="/jobs" :class="[isActiveLink('/jobs') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900', 'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200']">
            Jobs
          </RouterLink>

          <button @click="handlePostJobClick" class="ml-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95">
            Post a Job
          </button>

          <div class="relative ml-2">
            <button
              v-if="user"
              @click="showDropdown = !showDropdown"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-90"
            >
              {{ userInitial }}
            </button>

            <RouterLink v-else to="/signin" class="flex text-slate-400 hover:text-indigo-600 transition-colors">
              <UserCircle :size="32" />
            </RouterLink>

            <div
              v-if="showDropdown && user"
              class="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50"
            >
              <div class="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Account</div>
              <button
                @click="handleLogout"
                class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition-all hover:bg-red-50 hover:text-red-600"
              >
                <LogOut :size="18" />
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>
