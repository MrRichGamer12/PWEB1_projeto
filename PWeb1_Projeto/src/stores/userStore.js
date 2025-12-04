/* eslint-disable no-unused-labels */
import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const users = []              // não é ref, como pediste
  let currentUser = null        // utilizador autenticado

  // getter estilo computed
  const UserAuthenticated = computed(() => currentUser !== null)

  // ações
  function register(username, password) {
    const exists = users.find(u => u.username === username)
    if (exists) return false

    users.push({
      id: Date.now(),
      username,
      password
    })

    return true
  }

  function login(username, password) {
    const found = users.find(
      u => u.username === username && u.password === password
    )
    if (found) {
      currentUser = found
      return true
    }
    return false
  }

  function logout() {
    currentUser = null
  }

  function tester() {
    utilizer: 'neor';
    pass: 'H3y_:)ç'
  }

  return {
    users,
    currentUser,
    UserAuthenticated,
    register,
    login,
    logout,
    tester
  }
})
