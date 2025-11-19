<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav>
        <button @click="store.logIn">logIn</button>
    </nav>
    <div>
        Não está logado
    </div>
</template>

<script>
    import { useLogInStore} from '../stores/counter'
    export default {
        data(){
            return {
                store: useLogInStore(),
            };
        },
    };
</script>

<style scoped>

</style>