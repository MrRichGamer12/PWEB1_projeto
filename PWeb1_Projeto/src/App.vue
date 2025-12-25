<!-- eslint-disable no-unused-vars -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
import navBar from './components/nav-bar.vue'
import LogSigIn from './components/LogSigIn.vue';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()
const mostrar= ref(false)

/*onMounted(async () => {
  await userStore.devLogIn()
})*/

console.log(userStore.currentUser)
</script>

<template>
  <div>
    <navBar/>
    <div v-if="userStore.currentUser==null"><p>Não tem nenhuma conta ativa? <button @click="mostrar=true">LogIn</button></p></div>
    <div v-else><p>:)</p><!--Aqui vai ficar o hiperlink para o perfil--></div>
  </div>
  <RouterView/>
  <LogSigIn v-model:mostrar="mostrar" />
</template>

<style>
body{
  background-color: aliceblue;
}
</style>
