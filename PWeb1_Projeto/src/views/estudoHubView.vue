<template>
  <div class="estudo-hub-container">
    <h1 class="title">
      {{ this.atividade.nome }}
    </h1>
  <div v-if="this.editMod">
    <input type="text" v-model="this.nNome">
  </div>
  <h3 class="discip">
    Disciplina -
    {{ this.atividade.disciplina }}
  </h3>
  <div v-if="this.editMod">
    <input type="text" v-model="this.nDisciplina">
  </div>
  <br>
  <div class="ext-Acts">
    <button class="editor-acts" v-if="!this.editMod" @click="this.stEdit()">Edit</button>
    <button class="Remover-acts" v-if="!this.editMod" @click="this.deletAtv()"><RouterLink to="/estudo">Delete</RouterLink></button>
  </div>
  <div>
    <div class="timer-container">
      <span class="Timecount">{{ FormatarTempo(time) }}</span>
    </div>
    <div class="buttons-container">
      <div v-if="this.on">
        <button class="btn-start" @click="this.Start()">Start</button>
      </div>
      <div v-else>
        <button class="btn-stop" @click="this.Stop()">Stop</button>
      </div>
      <button class="btn-end" @click="this.End()" :disabled="this.time < 1">End</button>
    </div>
  </div>
  <br>
  <div class="morInfo">
    <div>
      horas=
      {{ this.meta }}
    </div>
    <div v-if="this.editMod">
      <input type="number" v-model="this.nMeta">
    </div>
    <br>
    <div>
      Descrição:
      {{ this.atividade.descricao }}
    </div>
    <div v-if="this.editMod">
      <input type="text" v-model="this.nDescricao">
    </div>
    <br>
    <div>
      De ->
      {{ this.atividade.inicio }}
    </div>
    <div v-if="this.editMod">
      <input type="date" v-model="this.nInicio">
    </div>
    <br>
    <div>
      Até ->
      {{ this.atividade.fim }}
    </div>
    <div v-if="this.editMod">
      <input type="date" v-model="this.nFim">
    </div>
  </div>
  <div class="positPlayer" v-if="!this.editMod">
    <MusicPlayer/>
  </div>
  <div class="positButter" v-else>
    <button @click="this.endEdit" class="canSub">cancelar</button>
    <button @click="this.subEdit" class="Submit">comfirm</button>
  </div>
  </div>
</template>

<script>
  import { useUserStore } from '@/stores/userStore'
  import { mapActions } from 'pinia'
  import MusicPlayer from '@/components/MusicPlayer.vue'
  export default {
    components:{
      MusicPlayer
    },
    data() {
      return {
        on: true,
        time:0,
        data:{},
        começo:"",
        final:"",
        intervalo: null,
        editMod: false,
        atividadeId: null,
        //edição
        nNome: null,
        nDisciplina: null,
        nMeta: null,
        nInicio: null,
        nFim: null,
        nDescricao: null
      }
    },
    computed: {
      atividade() {
        const store = useUserStore()
        return store.currentUser?.atividades?.find(a => a.id ===  this.atividadeId) || null
      },
      meta() {
        return this.atividade.meta / 3600
      }
    },
    created() {
      this.atividadeId = this.$route.params.id
      if(this.atividade){
        this.nNome = this.atividade.nome
        this.nDisciplina = this.atividade.disciplina
        this.nDescricao = this.atividade.descricao
        this.nMeta = Number((this.atividade.meta / 3600).toFixed(2))
        this.nInicio = this.atividade.inicio
        this.nFim = this.atividade.fim
      }
    },
    methods: {
    ...mapActions(useUserStore, ['addSeci', 'addXP', 'editAtv', 'removeAtv']),
      //De forma resumida isto cria um timer que vai contar a cada segundo 1
      Start() {
        this.on = false
        if(this.começo == ""){
          this.começo = new Date().toLocaleTimeString()
          const Y = new Date().getFullYear()
          const M = new Date().getMonth()
          const D = new Date().getDate()
          this.data = {Y, M, D}
        }
        this.intervalo = setInterval(() => {
          this.time += 1
        }, 1000)
        // O setInterval funciona da seguinte forma, setInterval(função, tempo em ms) para executar a função de x em x tempo
        console.log(this.atividade)
      },
      Stop() {
        this.on = true
        clearInterval(this.intervalo)//parar o timer de contar
      },
      async End() {
        this.Stop()
        this.final = new Date().toLocaleTimeString()
        if(confirm("Tens a certesa que queres terminar o estudo?")){
          const success = await this.addSeci(this.atividadeId, this.data, this.time, this.começo, this.final)
          const adictXP = await this.addXP(this.time)
          if (success && adictXP) {
            this.time = 0
            this.data = {}
            this.começo = ""
          } else alert('Tem algo errado')

        } else {
          this.Start()
        }
      },
      FormatarTempo(t){
        //Aqui fáz os calculos para defenir os segundos minutos e horas
        let sec = t % 60
        let min = ((t - sec) / 60) % 60
        const hor = ((t-sec)-(min*60)) / (60 *60)
        //aqui vai ser convertido valores de 1 digito para que tenha um 0 à frente
        if(sec < 10 )sec= '0'+ sec
        if(min < 10 )min= '0'+ min
        //Aqui irá returnar os valores corretamente
        return `${hor}:${min}:${sec}`
      },
      stEdit(){
        this.editMod = true
      },
      endEdit(){
        this.editMod = false;
      },
      async subEdit(){
        const nAtividade = {
          ...this.atividade,
          nome: this.nNome,
          disciplina: this.nDisciplina,
          meta: this.nMeta * 3600,
          inicio: this.nInicio,
          fim: this.nFim,
          descricao: this.nDescricao
        }
        const result = await this.editAtv(nAtividade)
        if (result) {this.endEdit()} else {alert('erro na submição')}
      },
      async deletAtv(){
        console.log(this.$route)
        await this.removeAtv(this.atividadeId)
      }
    }
  }
</script>

<style scoped>
.estudo-hub-container {
  padding-bottom: 350px;
  position: relative;
}
.timer-container {
  text-align: center;
}
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.btn-start {
  background-color: #6bcee4;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-stop {
  background-color: #c50303;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-end {
  background-color: #072a46;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-end:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.Timecount{
  font-size: 800%;
}
.title{
  margin-left: 10px;
  margin-bottom: 0;
}
.discip{
  margin-left: 10px;
  margin-top: 0;
}
.morInfo{
  margin-left: 10px;
}
.positPlayer{
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 100;
}
.editor-acts{
  position: relative;
  left: 88%;
  width: 5%;
  background-color: #6bcee4;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.canSub{
  background-color: #c50303;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 3%;
}
.Submit{
  background-color: #03c530;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 3%;
}
.positButter{
  display: flex;
  align-items: baseline;
  position: absolute;
  bottom: 2%;
  right: 5%;
}
.Remover-acts{
  position: relative;
  left: 89%;
  width: 5%;
  height: 30px;
  background-color: #f42222;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
