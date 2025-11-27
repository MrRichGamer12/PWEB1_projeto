<template>
    <div>
        <p>Estudador.com</p>
        <button @click="this.addTaref = true">+</button>
        <div v-if="addTaref">
            <button @click="close()">X</button>
            <p>Nome:<input type="text" name="inicio" id=""></p>
            <br>
            <p>disciplina:<input type="text" name="inicio" id=""></p>
            <br>
            <p>Nº de Horas: <input type="number" name="" id=""></p>
            <br>
            <p>Inicio do periodo de estudo: <input type="date" name="inicio" id=""></p>
            <br>
            <p>Fim do periodo de estudo: <input type="date" name="inicio" id=""></p>
            <br>
            <p>Descrição: <input type="text" name="" id=""></p>
            <button @click="submit">Submit</button>
        </div>
        <div></div>
        <div>
            <p></p>
        </div>
    </div>
</template>

<script>
    import  {useAgendaStore}  from '@/stores/estudoStore'
    export default {
        data() {
            return {
                addTaref: false,
                store: useAgendaStore(),
            }
        },
        methods: {
            close: function() {
                this.addTaref = false
            },
            submit: function() {
                this.addTaref = false
            }
        }
    }
</script>

<style scoped>

</style>