<!-- eslint-disable no-unused-vars -->
 <!-- o setup é um metodo que serve para indicar não passar as importações que
  acontecem para este arquivo não passe para os outros util para a base de todo o site -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
import navBar from './components/nav-bar.vue'
import LogSigIn from './components/LogSigIn.vue';
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Footer from './components/Footer.vue'


const userStore = useUserStore()
//Sincronisação do store com o próprio app.vue para alterar o login aqui e na store
const mostrar = computed({
  get: () => userStore.showLoginModal,
  set: (val) => userStore.setShowLoginModal(val)
})
</script>

<template>
  <div class="distroTela">
    <div class="NaviBar">
      <navBar/>
      <div class="User_InNav">
        <div v-if="userStore.currentUser==null">
          <button @click="mostrar=true">Log/SigIn</button>
        </div>
        <div v-else>
          <img
            :src="`/images/avatars/${userStore.currentUser.perfil.avatar}`"
            class="profile_Image"
          />
          <RouterLink to="/profile">
            {{ userStore.currentUser.username }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- CONTEÚDO -->
    <RouterView/>

    <!-- FOOTER -->
    <Footer/>
  </div>

  <LogSigIn v-model:mostrar="mostrar" class="Logs"/>
</template>


<style>
body{
  margin: 0%;
  background-color: aliceblue;
  font-family: 'Verdana', cursive;
}
.Logs{
  position: fixed;
  bottom: 30%;
  right: 40%;
}
.NaviBar{
  display: flex;
  padding: 5px;
  padding-left: 1%;
  padding-right: 2%;
  flex-direction: row;
  justify-content:  space-between;
  background-color: #333;
}
.distroTela{
  display: flex;
  flex-direction: column;
}
.User_InNav {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 110px;
}
.User_InNav button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.User_InNav button:hover {
  background-color: #45a049;
}
.User_InNav a {
  color: #FFD700;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 15px;
  border-radius: 5px;
  transition: color 0.3s ease;
}
.User_InNav a:hover {
  color: #FFA500;
  background-color: rgba(255, 215, 0, 0.1);
}
.profile_Image{
  max-width: 20%;
  border-radius:50%
}
.distroTela {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

RouterView {
  flex: 1;
}
</style>
