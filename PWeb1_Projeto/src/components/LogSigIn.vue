<template>
    <div v-if="this.Select">
      <p>UserName:<input type="text" v-model="TxtLogIn.nome"></p>
      <br>
      <p>PassWord:<input type="text" v-model="TxtLogIn.pass"></p>
      <br>
      <button @click="iniciarlogin()">LogIn</button>
      <p>Não tem conta? click aqui =><button @click="CHSigIn">SigIn</button></p>
    </div>
    <div v-else>
      <p>UserName:<input type="text" v-model="TxtSigIn.nome"></p>
      <br>
      <p>PassWord:<input type="text" v-model="TxtSigIn.pass"></p>
      <br>
      <p>Confirmar PassWord:<input type="text" v-model="TxtSigIn.paSS"></p>
      <br>
      <button @click="iniciarsigin()">SigIn</button>
      <p>Tem conta? click aqui =><button @click="CHLogin">LogIn</button></p>
    </div>
</template>

<script>
    import { useUserStore } from '@/stores/userStore'
    import { mapActions } from 'pinia'
    export default {
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
          } else alert('Tem algo errado')
        },
        async iniciarsigin() {
          if(this.TxtSigIn.pass == this.TxtSigIn.paSS){
            const siginar = await this.register(this.TxtSigIn.nome, this.TxtSigIn.pass)
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
