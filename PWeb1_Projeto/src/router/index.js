import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePageView.vue'
import LoginPageView from '@/views/logInSigInPageView.vue'
import RegisterPageView from '@/views/RegisterPageView.vue'
import ProfilePageView from '@/views/ProfilePageView.vue'
import streacPageView from '@/views/streacPageView.vue'
import estudoPageView from '@/views/estudoPageView.vue'
import Error404View from '@/views/404ErrorView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomePageView },
  { path: '/login', component: LoginPageView },
  { path: '/register', component: RegisterPageView },
  {
    path: '/profile', component: ProfilePageView, beforeEnter: (to, from, next) => {
      const userStore = useUserStore()

      if (!userStore.isAuthenticated) {
        console.log(userStore.$state.currentUser)
        next('/login')
      } else {
        console.log(userStore.$state.currentUser)
        next()
      }
    },
  },
  { path: '/streac', component: streacPageView },
  { path: '/estudo', component: estudoPageView },
  { path: '/aboutus', component: () => import('../views/aboutUs.vue') },
  { path: '/:catchAll(.*)*', component: Error404View}
  ],
})
export default router
