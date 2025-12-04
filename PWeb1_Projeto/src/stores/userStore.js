/* eslint-disable no-unused-labels */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],              // lista de utilizadores
    currentUser: null       // utilizador autenticado
  }),

  getters: {
    UserAuthenticated: (state) => state.currentUser !== null
  },

  actions: {
    register(username, password) {
      const exists = this.users.find(u => u.username === username)
      if (exists) return false

      this.users.push({
        id: Date.now(),
        username,
        password
      })

      return true
    },

    login(username, password) {
      const found = this.users.find(
        u => u.username === username && u.password === password
      )
      if (found) {
        this.currentUser = found
        return true
      }
      return false
    },

    logout() {
      this.currentUser = null
    },

    tester() {
      return {
        utilizer: 'neor',
        pass: 'H3y_:)ç'
      }
    }
  }
})
