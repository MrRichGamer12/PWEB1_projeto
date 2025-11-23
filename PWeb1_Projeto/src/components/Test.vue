<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<template>
    <nav>
        <button @click="store.logOut">logOut</button>
    </nav>
    <div>
        <p>Ok</p>
    </div>
    <div><RouterView /></div>
</template>

<script>
    import { Router } from 'express';
    import { useLogInStore} from '../stores/counter'
    import { RouterLink, RouterView } from 'vue-router';
    export default {
        data(){
            return {
                store: useLogInStore(),
            };
        },
    };
    const router = new Router({
        routes: [{
            path: '/',
            meta: {
                title: "Home"
            }
        }]
    })
    router.beforeEach((to) => {
        document.title = to.meta.title;
    })
</script>

<style scoped>

</style>