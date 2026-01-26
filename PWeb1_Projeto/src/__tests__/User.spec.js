import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../stores/userStore'

// =======================
// MOCK DA API
// =======================
vi.mock('../api/api', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
}))

import { get, post, put, del } from '../api/api'

// =======================
// SETUP
// =======================
beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

// =======================
// ESTADO INICIAL
// =======================
describe('UserStore — estado inicial', () => {
  it('inicia sem utilizador autenticado', () => {
    const store = useUserStore()

    expect(store.currentUser).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(store.showLoginModal).toBe(false)
  })
})

// =======================
// REGISTER
// =======================
describe('register', () => {
  it('regista utilizador com sucesso', async () => {
    get.mockResolvedValue([])
    post.mockResolvedValue({ id: 1, username: 'teste' })

    const store = useUserStore()
    const res = await store.register('teste', '1234')

    expect(get).toHaveBeenCalled()
    expect(post).toHaveBeenCalled()
    expect(res.success).toBe(true)
    expect(res.user.username).toBe('teste')
  })

  it('falha se username já existir', async () => {
    get.mockResolvedValue([{ id: 1 }])

    const store = useUserStore()
    const res = await store.register('teste', '1234')

    expect(res.success).toBe(false)
    expect(res.message).toBe('Esse nome já está a ser utilizado')
  })
})

// =======================
// LOGIN / LOGOUT
// =======================
describe('logIn / logOut', () => {
  it('faz login com sucesso', async () => {
    const user = {
      id: 1,
      username: 'teste',
      perfil: {},
      atividades: [],
      Recap: [],
    }

    get.mockResolvedValue([user])

    const store = useUserStore()
    const res = await store.logIn('teste', '1234')

    expect(res).toBe(true)
    expect(store.currentUser).toEqual(user)
    expect(store.isAuthenticated).toBe(true)
  })

  it('falha login com credenciais erradas', async () => {
    get.mockResolvedValue([])

    const store = useUserStore()
    const res = await store.logIn('teste', 'errado')

    expect(res).toBe(false)
    expect(store.currentUser).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('faz logout corretamente', () => {
    const store = useUserStore()
    store.currentUser = { id: 1 }

    store.logOut()

    expect(store.currentUser).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
})

// =======================
// PERFIL
// =======================
describe('updatePerfil', () => {
  it('atualiza o perfil do utilizador', async () => {
    const user = {
      id: 1,
      perfil: { nivel: 1, xp: 0 },
    }

    put.mockResolvedValue({
      ...user,
      perfil: { nivel: 2, xp: 50 },
    })

    const store = useUserStore()
    store.currentUser = user

    const res = await store.updatePerfil({ nivel: 2, xp: 50 })

    expect(put).toHaveBeenCalled()
    expect(res).toBe(true)
    expect(store.currentUser.perfil.nivel).toBe(2)
    expect(store.currentUser.perfil.xp).toBe(50)
  })
})

// =======================
// STREAK
// =======================
describe('updateStreak', () => {
  it('inicia ou atualiza streak corretamente', async () => {
    const user = {
      id: 1,
      perfil: {
        streak: { atual: 0, ultimaAtividade: null },
      },
    }

    put.mockResolvedValue(user)

    const store = useUserStore()
    store.currentUser = user

    const res = await store.updateStreak()

    expect(put).toHaveBeenCalled()
    expect(res).toBe(true)
  })
})

// =======================
// ATIVIDADES
// =======================
describe('addAct', () => {
  it('adiciona uma atividade', async () => {
    const user = {
      id: 1,
      atividades: [],
    }

    put.mockResolvedValue({
      ...user,
      atividades: [{ nome: 'Atv 1' }],
    })

    const store = useUserStore()
    store.currentUser = user

    const res = await store.addAct({ nome: 'Atv 1' })

    expect(res).toBe(true)
    expect(store.currentUser.atividades.length).toBe(1)
  })
})

describe('editAtv', () => {
  it('edita uma atividade existente', async () => {
    const user = {
      id: 1,
      atividades: [{ id: '1', nome: 'A' }],
    }

    put.mockResolvedValue({
      ...user,
      atividades: [{ id: '1', nome: 'B' }],
    })

    const store = useUserStore()
    store.currentUser = user

    const res = await store.editAtv({ id: '1', nome: 'B' })

    expect(res).toBe(true)
    expect(store.currentUser.atividades[0].nome).toBe('B')
  })
})

describe('removeAtv', () => {
  it('remove atividade por ID', async () => {
    const user = {
      id: 1,
      atividades: [{ id: '1' }, { id: '2' }],
    }

    put.mockResolvedValue(user)

    const store = useUserStore()
    store.currentUser = user

    await store.removeAtv('1')

    expect(store.currentUser.atividades).toHaveLength(1)
    expect(store.currentUser.atividades[0].id).toBe('2')
    expect(put).toHaveBeenCalled()
  })
})


// =======================
// XP
// =======================
describe('addXP', () => {
  it('adiciona XP e atualiza nível', async () => {
    const user = {
      id: 1,
      perfil: {
        xp: 0,
        nivel: 1,
        xpProximoNivel: 100,
        xpDoNivel: 100,
      },
    }

    put.mockResolvedValue(user)

    const store = useUserStore()
    store.currentUser = user

    const res = await store.addXP(1000)

    expect(put).toHaveBeenCalled()
    expect(res).toBe(true)
    expect(store.currentUser.perfil.xp).toBeGreaterThan(0)
  })
})

// =======================
// SESSÕES DE ESTUDO
// =======================
describe('addSeci', () => {
  it('adiciona sessão de estudo', async () => {
    const user = {
      id: 1,
      atividades: [{ id: '1', historico: [] }],
      Recap: [],
    }

    put.mockResolvedValue(user)

    const store = useUserStore()
    store.currentUser = user

    const res = await store.addSeci(
      '1',
      '2025-01-01',
      60,
      '10:00',
      '11:00'
    )

    expect(put).toHaveBeenCalled()
    expect(res).toBe(true)
  })
})

// =======================
// DELETE ACCOUNT
// =======================
describe('deleteAccount', () => {
  it('apaga a conta do utilizador', async () => {
    del.mockResolvedValue(true)

    const store = useUserStore()
    store.currentUser = { id: 1 }

    await store.deleteAccount()

    expect(del).toHaveBeenCalledWith('/users/1')
    expect(store.currentUser).toBeNull()
  })
})


// =======================
// MODAL LOGIN
// =======================
describe('setShowLoginModal', () => {
  it('altera estado do modal', () => {
    const store = useUserStore()

    store.setShowLoginModal(true)
    expect(store.showLoginModal).toBe(true)

    store.setShowLoginModal(false)
    expect(store.showLoginModal).toBe(false)
  })
})
