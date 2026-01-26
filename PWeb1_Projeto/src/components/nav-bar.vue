<template>
  <nav class="NavBar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/estudo">Estudo</RouterLink>
    <RouterLink to="/aboutus">AboutUs</RouterLink>

    <!-- Área Admin (apenas admins) -->
    <RouterLink v-if="isAdmin" to="/admin">
  Admin <span class="badge">⚙</span>
</RouterLink>

  </nav>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

export default {
  computed: {
    userStore() {
      return useUserStore()
    },
    isAdmin() {
      return this.userStore.isAdmin
    },
  },
}
</script>

<style lang="scss" scoped>
.NavBar {
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(a) {
    color: #ffffff;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      color: rgb(230, 221, 173);
    }
  }
}
</style>
