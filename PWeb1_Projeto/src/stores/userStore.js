/* eslint-disable no-unused-vars */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, post, put } from '@/api/api'

export const useUserStore = defineStore('user', () => {

  const currentUser = ref(null)

  const isAuthenticated = computed(() => currentUser.value !== null)

  async function register(username, password) {
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
    
  }
  async function logIn(username, password){
    try{
      const use = await get(`/users?username=${username}&password=${password}`)

      if (use.length > 0) {
        currentUser.value = use[0]
        return true
      }
      return false
    }catch(err){
      console.log('Erro:', err)
      return false
    }
  }
  function logOut() {
    currentUser.value = null
  }

  async function addAct(nAtv) {
    if (!currentUser.value)return false
    try {
      const atv = {
        id: crypto.randomUUID(),
        ...nAtv,
        historico: [],
      }
      const atvs = [...(currentUser.value.atividades || []), atv]

      const upUser = await put(`/users/${currentUser.value.id}`, {
        ...currentUser.value,
        atvs,
      })
    } catch(err) {console.error('Erro:',err);return false}
  }
  async function devLogIn() {
    const username = 'neor'
    const password = 'H3y_:)ç'
    return await logIn(username, password)
  }
  return {
    currentUser,
    isAuthenticated,
    register,
    logIn,
    logOut,
    addAct,
    devLogIn,
  }
})