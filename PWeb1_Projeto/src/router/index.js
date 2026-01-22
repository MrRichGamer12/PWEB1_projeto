import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePageView.vue'
import ProfilePageView from '@/views/ProfilePageView.vue'
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
//alteração da vareavel do login para que ele seja aberto ande re redirecionar para a home, porque não dá que eu saiba fazer ao contrário
        userStore.setShowLoginModal(true)
//O next false nega a entrada para o suposto link que queres entrar
        next(false)
      } else {
        next()
      }
    },
  },
  { path: '/estudo', component: estudoPageView },
  { path: '/estudo/:id', component: estudoHubView, beforeEnter: (to, from, next) => {
//tenta pegar a atividade do link do id
    try {
      const userStore = useUserStore()
      if(!userStore.isAuthenticated){
        userStore.setShowLoginModal(true)
        next('/')
        return
      }
      const atvd = userStore.acts.find(o => o.id === to.params.id)
      console.log(atvd)
      if (atvd === null){
        next(false)
      } else {
        next()
      }
    } catch {
      next('/')
    }

    },
  },
  { path: '/aboutus', component: () => import('../views/aboutUs.vue') },
  { path: '/:catchAll(.*)*', component: Error404View}
  ],
})
export default router
