<template>
  <div class="profile-page" v-if="user">
    <!-- Header -->
    <div class="profile-header">
      <img
        :src="`/avatars/${user.perfil.avatar}`"
        alt="Avatar"
        class="avatar"
      />

      <div class="user-info">
        <h2 v-if="!editing">{{ user.username }}</h2>

        <!-- Edit username -->
        <input
          v-else
          v-model="editUsername"
          type="text"
          placeholder="Novo username"
        />

        <button @click="toggleEdit">
          {{ editing ? 'Cancelar' : 'Editar perfil' }}
        </button>
      </div>
    </div>

    <!-- Edit avatar -->
    <div class="profile-section" v-if="editing">
      <h3>Avatar</h3>
      <select v-model="editAvatar">
        <option value="avatar_default.png">Default</option>
        <option value="avatar_01.png">Avatar 1</option>
        <option value="avatar_02.png">Avatar 2</option>
        <option value="avatar_03.png">Avatar 3</option>
      </select>

      <button @click="saveChanges">Guardar alterações</button>
    </div>

    <!-- Progressão -->
    <div class="profile-section">
      <h3>Progressão</h3>
      <p>Nível: {{ user.perfil.nivel }}</p>
      <progress
        :value="user.perfil.xp"
        :max="user.perfil.xpProximoNivel"
      />
    </div>

    <!-- Streak -->
    <div class="profile-section">
      <h3>Streak</h3>
      <p>🔥 {{ user.perfil.streak.atual }} dias</p>
    </div>

    <!-- Estatísticas -->
    <div class="profile-section">
      <h3>Estatísticas</h3>
      <p>Ações: {{ user.perfil.estatisticas.acoesRealizadas }}</p>
      <p>XP total: {{ user.perfil.estatisticas.xpTotal }}</p>
    </div>
  </div>

  <p v-else>Utilizador não autenticado.</p>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'ProfileView',

  data() {
    return {
      editing: false,
      editUsername: '',
      editAvatar: '',
    }
  },

  computed: {
    user() {
      console.log(useUserStore().currentUser)
      return useUserStore().currentUser
    },
  },

  methods: {
    toggleEdit() {
      this.editing = !this.editing

      if (this.editing) {
        this.editUsername = this.user.username
        this.editAvatar = this.user.perfil.avatar
      }
    },

    async saveChanges() {
      const store = useUserStore()

      // atualizar username
      if (this.editUsername !== this.user.username) {
        const upUser = {
          ...this.user,
          username: this.editUsername,
        }

        await store.updatePerfil({
          avatar: this.editAvatar,
        })

        await store.$patch({
          currentUser: upUser,
        })
      } else {
        await store.updatePerfil({
          avatar: this.editAvatar,
        })
      }

      this.editing = false
    },
  },
}
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

.profile-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.user-info button {
  margin-top: 0.5rem;
}

.profile-section {
  margin-top: 1.5rem;
}
</style>