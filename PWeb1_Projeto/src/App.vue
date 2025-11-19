<script>
import { useLogInStore} from './stores/counter.js'
import Display from '@/components/Display.vue'
import User from '@/components/Test.vue'

export default {
  data(){
    return {
      store: useLogInStore(),
    };
  },
  components(){
    Display,
    User
  }
};
</script>

<template>
  Hey
  <div v-if="store.isLogged"><User /></div>
  <div v-else><Display /></div>
  ABC
</template>

<style scoped></style>
