<template>
    <div v-if="sigIn">
        <p>Tem conta? click aqui =></p><button @click="logIn">LogIn</button>
    </div>
    <div v-else>
        <p>Nome:<input type="text"></p>
        <p>Não tem conta? click aqui =><button @click="sigIN">SigIn</button></p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                sigIn: false
            }
        },
        methods: {
            logIn: function(){
                this.sigIn = false
            },
            sigIN: function(){
                this.sigIn = true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>