import { createRouter, createWebHistory } from 'vue-router'
import home from '../components/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    components: home
  }],
})

export default router
