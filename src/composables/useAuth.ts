// src/composables/useAuth.ts
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)

export function useAuth() {
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  return { user, checkUser }
}
