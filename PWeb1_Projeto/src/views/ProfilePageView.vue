<template>
  <div class="profile-page" v-if="user">
    <!-- Header -->
    <div class="profile-header">
      <img :src="getAvatarUrl(user.perfil.avatar)" alt="Avatar" class="avatar" />

      <div class="user-info">
        <h2 v-if="!editing">{{ user.username }}</h2>

        <!-- Edit username -->
        <input v-else v-model="editUsername" type="text" placeholder="Novo username" />
        <div class="buttons">
          <button @click="toggleEdit" class="edit-button">
            {{ editing ? 'Cancelar' : 'Editar' }}
          </button>
          <button class="Delete-button">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit avatar -->
    <div class="profile-section" v-if="editing">
      <h3>Avatar</h3>

      <div class="avatar-grid">
        <img v-for="avatar in availableAvatars" :key="avatar" :src="`/images/avatars/${avatar}`" class="avatar-option"
          :class="{ selected: editAvatar === avatar }" @click="editAvatar = avatar" />
      </div>

      <button @click="saveChanges">Guardar alterações</button>
    </div>

    <!-- Progressão -->
    <div class="profile-section">
      <h3>Progressão</h3>
      <p>Nível: {{ user.perfil.nivel }}</p>
      <progress :value="user.perfil.xpProximoNivel" :max="user.perfil.xpDoNivel" />
    </div>

    <!-- Streak -->
    <div class="profile-section">
      <h3>Streak</h3>
      <p>🔥 {{ user.perfil.streak.atual }} dias</p>
    </div>

    <!-- Estatísticas -->
    <div class="profile-section">
      <h3>Estatísticas</h3>
      <p>Ações: {{ user.Recap.length }}</p>
      <p>XP total: {{ user.perfil.xp }}</p>
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
      availableAvatars: [],

    }
  },

  computed: {
    user() {
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
    getAvatarUrl(name) {
      return `/images/avatars/${name}`
    }

  },
  mounted() {
    // lista manual baseada na pasta public
    this.availableAvatars = [
      'avatar_1.png',
      'avatar_2.png',
      'avatar_3.png',
      'avatar_4.png',
      'avatar_5.png',
      'avatar_6.png',
      'avatar_7.png',
      'avatar_8.png',
    ]
  },

}
</script>

<style scoped>
/* PÁGINA */
.profile-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  color: #000;
}

/* CARD BASE (igual à Home) */
.profile-header,
.profile-section {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.4rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

/* HEADER ocupa linha inteira */
.profile-header {
  position: relative;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* AVATAR */
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid #1db954;
  object-fit: cover;
}

/* USER INFO */
.user-info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.user-info input {
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  border: none;
  outline: none;
}

.user-info button {
  margin-top: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: none;
  color: #000;
  font-weight: 600;
  cursor: pointer;
}


/* TÍTULOS DOS CARDS */
.profile-section h3 {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
  color: #1db954;
}

/* GRID DE AVATARES */
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 56px);
  gap: 12px;
}

.avatar-option {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.avatar-option:hover {
  transform: scale(1.1);
}

.avatar-option.selected {
  border-color: #1db954;
}

/* PROGRESS */
progress {
  width: 100%;
  height: 14px;
  border-radius: 10px;
  overflow: hidden;
}

progress::-webkit-progress-bar {
  background: rgba(255, 255, 255, 0.15);
}

progress::-webkit-progress-value {
  background: linear-gradient(90deg, #1db954, #3cff87);
}

/* TEXTO */
.profile-section p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
}

/* BOTÃO GUARDAR */
.profile-section button {
  margin-top: 0.8rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: #1db954;
  color: #000;
  font-weight: 600;
  cursor: pointer;
}

.profile-section button:hover {
  background: #17a44b;
}
.buttons {
  position: absolute;
  display: flex;
  align-items: baseline;
  right: 5%;
  top: 10%;
}
.edit-button {
  background: #1db954;
  margin-right: 10%;
}
.edit-button:hover {
  background: #17a44b;
}
.Delete-button {
  background-color: red;
}
.Delete-button:hover {
  background: #a70101;
}

</style>
