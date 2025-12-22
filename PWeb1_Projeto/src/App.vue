<!-- eslint-disable no-unused-vars -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
import navBar from './components/nav-bar.vue'
import LogSigIn from './components/LogSigIn.vue';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const logar= false

onMounted(async () => {
  await userStore.devLogIn()
})
</script>

<template>
  <div>
    <navBar/>
    <div v-if="userStore.currentUser=null"><p>Não tem nenhuma conta ativa.</p><button>LogIn</button></div>
    <div v-else><p>:)</p><!--Aqui vai ficar o hiperlink para o perfil--></div>
  </div>
  <RouterView/>
  <div v-if="logar"><LogSigIn/></div>
</template>

<style>
body{
  background-color: aliceblue;
}
</style>
