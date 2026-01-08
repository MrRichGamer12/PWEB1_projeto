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
          Recap: []
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

    //Adicionar XP
    async addXP(Time){
//Para resumir o que eu pretendo é ao submeter o tempo e dividilo por 1000 isso será o XP adicionado e pertendo
//fazer algo como um cilo que a base é 100 e por cada nivel que é adiconado adicionar 2 apra cada nivél
      if (!this.currentUser) return false
      try{
        let xp = Time / 1000
        let lv = 1
        this.currentUser.perfil.xp += xp
        xp = this.currentUser.perfil.xp
        for(let i = 1; 98+(i*2) < xp ; i++){
          xp = xp - (98+(i*2))
          this.currentUser.perfil.xpProximoNivel = (98+(i*2)) - xp
          lv += 1
        }
        this.currentUser.perfil.nivel = lv
        await put(`/users/${this.currentUser.id}`, {
          ...this.currentUser,
        })
        return true
      }catch(err){
        console.log(err)
        return false
      }
    },

    //Adicionar registro de estudo
    async addSeci(Id, Date, Time, Start, Finish){
      if (!this.currentUser) return false
      try{
//Inicialmente eu preseso do index da atividade que vou gruardar a seção de estudo
//PAra isso primeiro vou dar um find através do Id da pagina
        const indexA = this.currentUser.atividades.find(o => o.id === Id)
//depos é so dar um IndexOf atividades para as identificar qual é o seu index
        const indexB = this.currentUser.atividades.indexOf(indexA)

//Aqui vai estar o que vai ser colocado em cada string,
//O rHist vais para a arey Recap e a nSec para o hstórico da atividade
        const rHist = {Id, Time, Date}
        const nSec = [Time, Date, Start, Finish]

//Aqui é adicionado o novo registro em cada uma das partes
        const historico = [...(this.currentUser.Recap || []), rHist]
        const addHist = [...(this.currentUser.atividades[indexB].historico || []), nSec]

//Esta parte a a assimilação com a base de dados onde centraliso tudo e dou put para atualizar os dados.
        indexA.historico= addHist
        this.currentUser.atividades[indexB] = indexA
        this.currentUser.Recap = historico
        await put(`/users/${this.currentUser.id}`, {
          ...this.currentUser,
        })
        return true
      }catch(err){
        console.log(err)
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
