import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/aparencia.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    components: home
  }],
})

export default router
