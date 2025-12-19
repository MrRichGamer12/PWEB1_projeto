<template>
    <div v-if="this.Select">
      <p>UserName:<input type="text" v-model="LogIn.nome"></p>
      <br>
      <p>PassWord:<input type="text" v-model="LogIn.pass"></p>
      <br>
      <button>LogIn</button>
      <p>Não tem conta? click aqui =><button @click="CHSigIn">SigIn</button></p>
    </div>
    <div v-else>
      <p>UserName:<input type="text" v-model="SigIn.nome"></p>
      <br>
      <p>PassWord:<input type="text" v-model="SigIn.pass"></p>
      <br>
      <p>Confirmar PassWord:<input type="text"></p>
      <br>
      <button>SigIn</button>
      <p>Tem conta? click aqui =><button @click="CHLogin">LogIn</button></p>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { useUserStore } from '@/stores/userStore'
    export default {
      data() {
        return {
          Select: true,
          LogIn: {
            nome: "",
            pass: ""
          },
          SigIn: {
            nome: "",
            pass: "",
            paSS: ""
          }
        }
      },
      methods: {
        CHLogin() {
          this.Select = true
          this.LogIn.nome = ""
          this.LogIn.pass = ""
        },
        CHSigIn() {
          this.Select = false
          this.SigIn.nome = ""
          this.SigIn.pass = ""
          this.SigIn.paSS = ""
        },
        async iniciarlogin() {
          const lig = await this.logIn(this.LogIn.nome, this.LogIn.pass)
          if (lig) {
            alert("por enquantoassim")
          } else alert('Tem algo errado')
        },
        async iniciarsigin() {
          if(this.SigIn.pass == this.SigIn.paSS){
            const siginar = await this.register(this.SigIn.nome, this.SigIn.pass)
            if(siginar){
              alert("Utilisador Criado")
            } else alert("Algo de érrado aconteceu")
          }else{
            alert("a password não é a mesma")
          }
        }
      },
    }
</script>

<style scoped>

</style>
