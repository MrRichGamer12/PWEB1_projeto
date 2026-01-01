<template>
  <div>
    <span>0:00:00 - {{ time }}</span>
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
  export default {
    data() {
      return {
        on: true,
        time:0,
        começo:"",
        final:"",
        intervalo: null
      }
    },
    methods: {
      Start() {
        this.on = false
        if(this.começo!=""){
          this.começo = new Date().toLocaleTimeString()
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
      End() {
        this.Stop()
        this.final = new Date().toLocaleTimeString()
      }
    },
  }
</script>

<style scoped>

</style>
