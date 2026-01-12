<template>
  <h1 class="title">
    {{ this.atividade.nome }}
  </h1>
  <h3 class="discip">
    Disciplina -
    {{ this.atividade.disciplina }}
  </h3>
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
  <div class="morInfo">
    <br>
    <div>
      horas=
      {{ this.atividade.meta }}
    </div>
    <br>
    <div>
      Descrição:
      {{ this.atividade.descricao }}
    </div>
    <br>
    <div>
      De ->
      {{ this.atividade.inicio }}
    </div>
    <br>
    <div>
      Até ->
      {{ this.atividade.fim }}
    </div>
  </div>

</template>

<script>
  import { useUserStore } from '@/stores/userStore'
  import { mapActions } from 'pinia'
  export default {
    data() {
      return {
        on: true,
        time:0,
        data:{},
        começo:"",
        final:"",
        intervalo: null,
        atividade: null
      }
    },
    beforeMount() {
      const store = useUserStore()
      this.atividade = store.currentUser.atividades.find(a => a.id === this.$route.params.id)
      this.atividade.meta /= 3600
      this.atividade.meta = Number((this.atividade.meta).toFixed(1))
    },
    methods: {
    ...mapActions(useUserStore, ['addSeci', 'addXP']),
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
      },
      Stop() {
        this.on = true
        clearInterval(this.intervalo)//parar o timer de contar
      },
      async End() {
        this.Stop()
        this.final = new Date().toLocaleTimeString()
        if(confirm("Tens a certesa que queres terminar o estudo?")){
          const success = await this.addSeci(this.$route.params.id, this.data, this.time, this.começo, this.final)
          const adictXP = await this.addXP(this.time)
          if (success && adictXP) {
            this.time = 0
            this.data = {}
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
      }
    },
  }
</script>

<style scoped>
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
</style>
