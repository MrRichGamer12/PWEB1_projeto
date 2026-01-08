<template>
  <div v-if="mostrar" class="logSigIn">
    <div v-if="this.Select">
      <p>UserName:<input type="text" v-model="TxtLogIn.nome"></p>
      <br>
      <p>PassWord:<input type="password" v-model="TxtLogIn.pass"></p>
      <br>
      <button @click="iniciarlogin()">LogIn</button>
      <p>Não tem conta? click aqui =><button @click="CHSigIn">SigIn</button></p>
    </div>
    <div v-else>
      <p>UserName:<input type="text" v-model="TxtSigIn.nome"></p>
      <br>
      <p>PassWord:<input type="password" v-model="TxtSigIn.pass"></p>
      <br>
      <p>Confirmar PassWord:<input type="password" v-model="TxtSigIn.paSS"></p>
      <br>
      <button @click="iniciarsigin()">SigIn</button>
      <p>Tem conta? click aqui =><button @click="CHLogin">LogIn</button></p>
    </div>
  </div>
</template>

<script>
    import { useUserStore } from '@/stores/userStore'
    import { mapActions } from 'pinia'
    export default {
      props: {
        mostrar: {
          type: Boolean,
          default: false
        },
      },
      data() {
        return {
          Select: true,
          TxtLogIn: {
            nome: "",
            pass: ""
          },
          TxtSigIn: {
            nome: "",
            pass: "",
            paSS: ""
          }
        }
      },
      emits: ['update:mostrar'],
      methods: {
        ...mapActions(useUserStore,['logIn', 'register']),
        CHLogin() {
          this.Select = true
          this.TxtLogIn.nome = ""
          this.TxtLogIn.pass = ""
        },
        CHSigIn() {
          this.Select = false
          this.TxtSigIn.nome = ""
          this.TxtSigIn.pass = ""
          this.TxtSigIn.paSS = ""
        },
        async iniciarlogin() {
          const lig = await this.logIn(this.TxtLogIn.nome, this.TxtLogIn.pass)
          if (lig) {
            alert("por enquantoassim")
            this.$emit('update:mostrar', false)
            console.log(this.mostrar)
          } else alert('Tem algo errado')
        },
        async iniciarsigin() {
          if(this.TxtSigIn.pass == this.TxtSigIn.paSS){
            const siginar = await this.register(this.TxtSigIn.nome, this.TxtSigIn.pass)
            if(siginar){
              alert("Utilisador Criado")
              this.$emit('update:mostrar', false)
            } else alert("Algo de érrado aconteceu")
          }else{
            alert("a password não é a mesma")
          }
        }
      },
    }
</script>

<style scoped>
.logSigIn{
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  max-width: 24%;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
</style>
