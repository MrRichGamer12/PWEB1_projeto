<template>
    <nav class="NavBar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/estudo">Estudo</RouterLink>
        <RouterLink to="/aboutus">AboutUs</RouterLink>
    </nav>
</template>

<script>
    export default {

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
