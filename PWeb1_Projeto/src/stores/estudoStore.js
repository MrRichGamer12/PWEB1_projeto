/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
//para poder usar o measdodos da API
import { get, post, put, del, buildQueryString } from '@/api/api.js'

export const useAgendaStore = defineStore('tarefa', () => {
  const atividadesUtili = [{
    id: Number,
    nome: String,
    disciplina: String,
    descrição: Text,
    meta: Number,
    inicio: Date,
    fim: Date,
    historico: []
  }]
  return { atividadesUtili } 
})
