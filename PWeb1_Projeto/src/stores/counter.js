/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mapActions } from 'pinia'

export const useLogInStore = defineStore('Logar', () => {
  state: () => ({ isLogged: false, isAdmin: false})
  acions: {
    logIn() {
      this.isLogged = true;
    }
  }
})
