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
  <navBar/>
  <RouterView/>
  <div><LogSigIn/></div>
</template>

<style>
body{
  background-color: aliceblue;
}
</style>
