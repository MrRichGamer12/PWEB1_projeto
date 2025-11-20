import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePageView.vue'
import LoginPageView from '@/views/LoginPageView.vue'
import RegisterPageView from '@/views/RegisterPageView.vue'
import ProfilePageView from '@/views/ProfilePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomePageView },
  { path: '/login', component: LoginPageView },
  { path: '/register', component: RegisterPageView },
  { path: '/profile/:username', component: ProfilePageView, beforeEnter(to, from, next){
  if (!UserAuhtenticated()) {
    next('/login');
  }else{
    next();
  }
},}
  ],
})
export default router
