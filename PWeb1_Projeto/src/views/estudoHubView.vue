<template>
  <div>
    <p>Timer</p>
  </div>
  <div>
    <div v-if="this.On">
      <button @click="this.Start()">Start</button>
    </div>
    <div v-else>
      <button @click="this.Stop()">Stop</button>
    </div>
    <div v-if="this.Time != ''">
      <button @click="this.End()">End</button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        on: true,
        time:"",
        começo:"",
        final:""
      }
    },
    methods: {
      Start() {
        this.On = false
        if(this.começo!=""){
          this.começo = new Date().toLocaleTimeString()
        }
      },
      Stop() {
        this.On = true
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
