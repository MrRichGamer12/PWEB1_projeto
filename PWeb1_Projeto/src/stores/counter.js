import { defineStore } from 'pinia'

export const useCounterStore = defineStore('tarefaId', () => {
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
  return { atividadesUtili} 
})
