<!-- eslint-disable no-unused-vars -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
import navBar from './components/nav-bar.vue'
import LogSigIn from './components/LogSigIn.vue';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.devLogIn()
})
</script>

<template>
  <div>
    <navBar/>
    <div><p>Não tem nenhuma conta ativa.</p><button>LogIn</button></div>
    <div><!--Aqui vai ficar o hiperlink para o perfil--></div>
  </div>
  <RouterView/>
  <div><LogSigIn/></div>
</template>

<style>
body{
  background-color: aliceblue;
}
</style>
