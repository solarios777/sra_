import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

// View Imports
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import JobView from '@/views/JobView.vue'
import AuthView from '@/views/AuthView.vue'
import EditJobView from '@/views/EditJobView.vue'
import AddJobView from '@/views/AddJobView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView,
      // Metadata to mark this route as protected
      meta: { requiresAuth: true },
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: AddJobView,
      // Metadata to mark this route as protected
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'AuthView',
      component: AuthView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

/**
 * Navigation Guard
 * This runs before every single route change.
 */
router.beforeEach(async (to, from, next) => {
  // 1. Fetch current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 2. Determine if the destination route requires authentication
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // 3. Security Logic
  if (requiresAuth && !session) {
    // If route is protected and no user is logged in -> Redirect to Sign In
    next({ name: 'AuthView' })
  } else if (to.name === 'AuthView' && session) {
    // If user is ALREADY logged in and tries to access Sign In page -> Redirect Home
    next({ name: 'home' })
  } else {
    // Otherwise, allow the navigation
    next()
  }
})

export default router
