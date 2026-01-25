<template>
  <div>
    <button class="addAtvButt" @click="addTaref = true">+</button>
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
      <div class="box_cards">
        <div v-for="atividade in currentUser.atividades" :key="atividade.id">
          <div class="Card">
            <RouterLink :to="`/estudo/${atividade.id}`"><button class="card-button">Começar</button></RouterLink>
            <strong class="Titulo-card">{{ atividade.nome }}</strong>
            <p class="disciplina-card">{{ atividade.disciplina }}</p>
            <!--Nota Para identificar o ${} no vue tem que ser em "`${abc}`" para funcionar-->
            <p class="Descri-card">{{ atividade.descricao }}</p>
            <p class="Meta-card">Meta:{{ this.realMeta(atividade.meta) }}h</p>
            <p class="inicio-card">De: {{ atividade.inicio }}</p>
            <p class="fim-card">Até: {{ atividade.fim }}</p>
          </div>
        </div>
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
      //passar de segundos para horas
      this.novaTarefa.meta *= 3600
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
    realMeta(i) {
      console.log(i)
      return i / 3600
    },
  },
}
</script>

<style scoped>
  .box_cards{
    margin-top: 20px;
    display: flex;
  }
  .Card{
    position: relative;
    min-width: 300px;
    border: 3px solid black;
    border-radius: 2%;
    margin-left: 30px;
    margin-right: 10px;
    padding: 2%;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  .card-button{
    position: absolute;
    top: 7%;
    right: 6%;
    border: none;
    padding: 1% 2%;
    font-size: 16px;
    border-radius: 5px;
    font-size: larger;
  }
  .card-button button:hover {
    background-color: rgb(255, 0, 0);
  }
  .Titulo-card{
    position: absolute;
    width: 65%;
    font-size: larger;
  }
  .addAtvButt{
    position: absolute;
    top: 10%;
    right: 3%;
    background-color: rgb(53, 49, 49);
    color: aliceblue;
    font-weight: bolder;
    border: solid 1px rgb(53, 49,49);
    border-radius: 10%;
  }
  .addAtvButt:hover {
    background-color: aliceblue;
    border: solid 1px rgb(53, 49,49);
    color: rgb(53, 49,49);
  }
  .disciplina-card {
  }
  .Descri-card{
  }
  .Meta-card{
  }
  .inicio-card{
  }
  .fim-card{
  }
</style>
