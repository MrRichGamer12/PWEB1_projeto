/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
//para poder usar o measdodos da API
import { get, post, put, del, buildQueryString } from '@/api/api.js'

export const useAgendaStore = defineStore('tarefa', {
  state: () = ({})
})
