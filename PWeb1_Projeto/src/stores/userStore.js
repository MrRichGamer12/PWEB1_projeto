/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { get, post, put } from '@/api/api'

export const useUserStore = defineStore('user',{
  state: () => ({
    currentUser: null
  }),
  getters: {
    isAuthenticated: (state) => state.currentUser !== null
  },
  actions: {
    async register(username, password) {
      try {//confirmação de existencia de utilizadores
        const existe = await get(`/users?username=${username}`)
        if (existe.lenght != 0){
          return {success: false, message:'Esse nome já está a ser utilizado'}
        }
      //criar utilizador
      const nUser = await post('/users', {
        username,
        password,
        cargo: 0,
        atividades: [],
      })
      const newUser = await post('/users', {
        username,
        password,
        cargo: 0,
        atividades: [],
      })
      return { success: true, user: nUser }
    } catch(error) {
      console.error('Erro no registo:', error)
      return { success: false, message: 'Deu Tudo errado ao registar' }
    }
  },
  async logIn(username, password){
    try{
      const use = await get(`/users?username=${username}&password=${password}`)
      if (use.length > 0) {
        this.currentUser.value = use[0]
        return true
      }
      return false
    }catch(error){
      console.log('Erro:', error)
      return false
    }
  },
  logOut() {
    this.currentUser.value = null
  },

  async addAct(nAtv) {
    console.log(this.currentUser.value)
    if (!this.currentUser.value)return false
    try {
      const atv = {
        id: crypto.randomUUID(),
        ...nAtv,
        historico: [],
      }
      const atividades = [...(this.currentUser.value.atividades || []), atv]

      const upUser = await put(`/users/${this.currentUser.value.id}`, {
        ...this.currentUser.value,
        atividades,
      })
      this.currentUser = upUser
      return true
    } catch(error) {console.error('Erro:',error);return false}
  },
  async devLogIn() {
    const username = 'neor'
    const password = 'H3y_:)ç'
    return await this.logIn(username, password)
  }
  },
})