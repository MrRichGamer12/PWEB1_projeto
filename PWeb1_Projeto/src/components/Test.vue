<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav>
        <button @click="store.logOut">logOut</button>
    </nav>
    <div>
        <p>Ok</p>
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