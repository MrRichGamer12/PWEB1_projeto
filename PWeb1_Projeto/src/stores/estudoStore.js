/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
//para poder usar o measdodos da API
import { get, post, put, del, buildQueryString } from '@/api/api.js'

export const useAgendaStore = defineStore('tarefa', {
  state: () => ({
    // Lista de atividades (pode ser filtrada/pesquisada/paginada)
    act: [],
    // Estados de carregamento e erro para feedback ao utilizador
    loading: false,
    error: null,
    useid: 0,
    // Gerir paginas
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    async fetchAtiv() {
      this.loading = true
      this.error = null
      try {
        const countParams = {}

        const countQuery = buildQueryString(countParams)
        const allFiltered = await get(`/books${countQuery}`)
        this.totalItems = allFiltered.length
        
        // Depois, obtemos a página atual com todos os parâmetros
        const queryString = this.buildBooksQuery()
        const data = await get(`users/0/${queryString}`)
        this.act = data
        console.log(data)
      } catch (err) {
        this.error = `Erro ao carreggar atividades: ${err.message}`
        this.act = []
      } finally {
        this.loading = false
      }
    }
  })
})
