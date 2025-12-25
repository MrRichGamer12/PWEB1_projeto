import { defineStore } from 'pinia'
import { get, post, put } from '@/api/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),

  getters: {
    isAuthenticated: (state) => state.currentUser !== null,

    // 👉 acesso rápido ao perfil
    perfil: (state) => state.currentUser?.perfil || null,
  },

  actions: {
    async register(username, password) {
      try {
        const existe = await get(`/users?username=${username}`)
        if (existe.length !== 0) {
          return { success: false, message: 'Esse nome já está a ser utilizado' }
        }

        const newUser = await post('/users', {
          username,
          password,
          cargo: 0,
          atividades: [],
          perfil: {
            avatar: 'avatar_default.png',
            nivel: 1,
            xp: 0,
            xpProximoNivel: 100,
            streak: {
              atual: 0,
              ultimaAtividade: null,
            },
            estatisticas: {
              acoesRealizadas: 0,
              xpTotal: 0,
            },
            atividadeRecente: [],
          },
        })

        return { success: true, user: newUser }
      } catch (error) {
        console.error('Erro no registo:', error)
        return { success: false, message: 'Erro ao registar utilizador' }
      }
    },

    async logIn(username, password) {
      try {
        const use = await get(`/users?username=${username}&password=${password}`)
          console.log('GET /users resposta:', use)
        if (use.length > 0) {
          this.currentUser = use[0]
          console.log(this.currentUser)
          return true
        }
        return false
      } catch (error) {
        console.log('Erro:', error)
        return false
      }
    },

    logOut() {
      this.currentUser = null
    },

    /* -------------------------------
       PERFIL – VER E EDITAR
    -------------------------------- */

    async updatePerfil(dadosPerfil) {
      if (!this.currentUser) return false

      try {
        const perfil = {
          ...this.currentUser.perfil,
          ...dadosPerfil,
        }

        const upUser = await put(`/users/${this.currentUser.id}`, {
          ...this.currentUser,
          perfil,
        })

        this.currentUser = upUser
        return true
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
        return false
      }
    },

    async addXp(xp) {
      if (!this.currentUser) return false

      const perfil = { ...this.currentUser.perfil }

      perfil.xp += xp
      perfil.estatisticas.xpTotal += xp
      perfil.estatisticas.acoesRealizadas++

      // subir de nível
      if (perfil.xp >= perfil.xpProximoNivel) {
        perfil.nivel++
        perfil.xp -= perfil.xpProximoNivel
        perfil.xpProximoNivel += 100
      }

      return await this.updatePerfil(perfil)
    },

    async updateStreak() {
      if (!this.currentUser) return false

      const hoje = new Date().toISOString().split('T')[0]
      const perfil = { ...this.currentUser.perfil }
      const ultima = perfil.streak.ultimaAtividade

      if (ultima === hoje) return true

      if (
        ultima &&
        new Date(hoje) - new Date(ultima) === 86400000
      ) {
        perfil.streak.atual++
      } else {
        perfil.streak.atual = 1
      }

      perfil.streak.ultimaAtividade = hoje

      return await this.updatePerfil(perfil)
    },

    /* -------------------------------
       ATIVIDADES (já existente)
    -------------------------------- */

    async addAct(nAtv) {
      if (!this.currentUser) return false

      try {
        const atv = {
          id: crypto.randomUUID(),
          ...nAtv,
          historico: [],
        }

        const atividades = [...(this.currentUser.atividades || []), atv]

        const upUser = await put(`/users/${this.currentUser.id}`, {
          ...this.currentUser,
          atividades,
        })

        this.currentUser = upUser
        return true
      } catch (error) {
        console.error('Erro:', error)
        return false
      }
    },

    async devLogIn() {
      const username = 'neor'
      const password = 'H3y_:)ç'
      return await this.logIn(username, password)
    },
  },
})
