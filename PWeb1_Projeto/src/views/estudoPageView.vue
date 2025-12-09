<template>
    <div>
        <button @click="this.addTaref = true">+</button>
        <br>
        <div v-if="addTaref">
            <button @click="close()">X</button>
            <p>Nome:<input type="text" v-model="novaTarefa.nome"/></p>
            <br>
            <p>disciplina:<input type="text" v-model="novaTarefa.disciplina"/></p>
            <br>
            <p>Nº de Horas: <input type="number" v-model="novaTarefa.meta"></p>
            <br>
            <p>Inicio do periodo de estudo: <input type="date" v-model="novaTarefa.inicio"></p>
            <br>
            <p>Fim do periodo de estudo: <input type="date" v-model="novaTarefa.fim"></p>
            <br>
            <p>Descrição: <input type="text" v-model="novaTarefa.descricao"></p>
            <button @click="submit">Submit</button>
        </div>
        <br>
        <div v-if="this.userStore.currentUser?.atvs?.length > 0">
            <h3>Os teus planos de estudo:</h3>
            <div v-for="atividade in userStore.currentUser.atividades" :key="atividade.id">
                <p><strong>{{ atividade.nome }}</strong> - {{ atividade.disciplina }}</p>
                <p>{{ atividade.descricao }}</p>
                <p>Meta:{{ atividade.meta }}h | {{ atividade.inicio }} -> {{ atividade.fim }}</p>
                <hr/>
            </div>
        </div>
        <div v-else>
            <p>Ainda não tens nenhum plano de estudo clique no botão "+" para adicionar um novo plano de estudo</p>
        </div>
    </div>
</template>

<script>
    import  {useUserStore}  from '@/stores/userStore'

    export default {
        data() {
            return {
                addTaref: false,
                userStore: useUserStore(),
                    novaTarefa: {
                    nome: '',
                    disciplina: '',
                    descricao: '',
                    meta: 0,
                    inicio: '',
                    fim: '',
                },
            }
        },
        methods: {
            close: function() {
                this.addTaref = false
                this.limparForm()
                console.log(this.userStore.currentUser?.atvs?.length)
            },
            async submit() {
                // Chama a função da store para adicionar atividade
                const success = await this.userStore.addAct(this.novaTarefa)
                console.log(this.novaTarefa,success)

                if (success) {
                    this.addTaref = false
                    this.limparForm()
                } else alert('Tem algo errado')
            },
            limpForm() {
                this.novaTarefa = {
                nome: '',
                disciplina: '',
                descricao: '',
                meta: 0,
                inicio: '',
                fim: '',
                }
            },
        }
        
    }
</script>

<style scoped>

</style>