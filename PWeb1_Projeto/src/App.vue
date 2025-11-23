<script>
import { useLogInStore} from './stores/counter.js'
import Display from '@/components/Display.vue'
import User from './components/test.vue'

export default {
  components(){
    Display,
    User
  },
  data(){
    return {
      store: useLogInStore(),
    };
  },
  
};
</script>

<template>
  Hey
  <div v-if="store.isLogged"><User /></div>
  <div v-else><Display /></div>
  ABC
</template>

<style scoped></style>
