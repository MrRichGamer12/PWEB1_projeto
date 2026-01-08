import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePageView.vue'
import ProfilePageView from '@/views/ProfilePageView.vue'
import streacPageView from '@/views/streacPageView.vue'
import estudoPageView from '@/views/estudoPageView.vue'
import estudoHubView from '@/views/estudoHubView.vue'
import Error404View from '@/views/404ErrorView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomePageView },
  {
    path: '/profile', component: ProfilePageView, beforeEnter: (to, from, next) => {
      const userStore = useUserStore()

      if (!userStore.isAuthenticated) {
        console.log(userStore.$state.currentUser)
        next('/:catchAll(.*)*')
      } else {
        console.log(userStore.$state.currentUser)
        next()
      }
    },
  },
  { path: '/streac', component: streacPageView },
  { path: '/estudo', component: estudoPageView },
  { path: '/estudo/:id', component: estudoHubView },
  { path: '/aboutus', component: () => import('../views/aboutUs.vue') },
  { path: '/:catchAll(.*)*', component: Error404View}
  ],
})
export default router
