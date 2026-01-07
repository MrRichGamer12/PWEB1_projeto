<template>
  <div>
    <span>{{ FormatarTempo(time) }}</span>
  </div>
  <div>
    <div v-if="this.on">
      <button @click="this.Start()">Start</button>
    </div>
    <div v-else>
      <button @click="this.Stop()">Stop</button>
    </div>
    <div v-if="this.time != 0">
      <button @click="this.End()">End</button>
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
        intervalo: null
      }
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

</style>
