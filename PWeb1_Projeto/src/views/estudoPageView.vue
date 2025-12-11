<template>
  <div>
    <button @click="addTaref = true">+</button>
    <br />
    <div v-if="addTaref">
      <button @click="close()">X</button>
      <p>Nome:<input type="text" v-model="novaTarefa.nome" /></p>
      <br />
      <p>disciplina:<input type="text" v-model="novaTarefa.disciplina" /></p>
      <br />
      <p>Nº de Horas: <input type="number" v-model="novaTarefa.meta" /></p>
      <br />
      <p>Inicio do periodo de estudo: <input type="date" v-model="novaTarefa.inicio" /></p>
      <br />
      <p>Fim do periodo de estudo: <input type="date" v-model="novaTarefa.fim" /></p>
      <br />
      <p>Descrição: <input type="text" v-model="novaTarefa.descricao" /></p>
      <button @click="submit">Submit</button>
    </div>
    <br />
    <div v-if="currentUser?.atividades?.length > 0">
      <h3>Os teus planos de estudo:</h3>
      <div v-for="atividade in currentUser.atividades" :key="atividade.id">
        <p>
          <strong>{{ atividade.nome }}</strong> - {{ atividade.disciplina }}
        </p>
        <p>{{ atividade.descricao }}</p>
        <p>Meta:{{ atividade.meta }}h | {{ atividade.inicio }} -> {{ atividade.fim }}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <p>
        Ainda não tens nenhum plano de estudo clique no botão "+" para adicionar um novo plano de
        estudo
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      addTaref: false,
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
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(useUserStore, ['addAct']),
    close() {
      this.addTaref = false
      this.limpForm()
      console.log(this.currentUser?.atividades?.length)
    },
    async submit() {
      // Chama a função da store para adicionar atividade
      const success = await this.addAct(this.novaTarefa)
      console.log(this.novaTarefa, success)

      if (success) {
        this.addTaref = false
        this.limpForm()
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
  },
}
</script>

<style scoped></style>
