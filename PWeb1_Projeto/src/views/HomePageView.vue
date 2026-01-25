<template>
  <div>

    <!-- CONTEÚDO PÚBLICO -->
    <div v-if="!isAuthenticated" class="public">

      <div class="public-hero">
        <h1>Estuda de forma inteligente</h1>
        <p>
          Organiza atividades, acompanha o teu progresso
          e sobe de nível enquanto estudas.
        </p>
      </div>

      <div class="public-cards">
        <div class="card">
          <h3>📈 Progressão por níveis</h3>
          <p>Transforma tempo de estudo em XP.</p>
        </div>

        <div class="card">
          <h3>🔥 Streaks</h3>
          <p>Estuda todos os dias para manteres a tua sequência.</p>
        </div>

        <div class="card">
          <h3>📊 Estatísticas</h3>
          <p>Acompanha a tua evolução ao longo do tempo.</p>
        </div>
      </div>

    </div>

    <!-- CONTEÚDO PRIVADO (LOGADO) -->
    <div v-else class="home">

      <!-- BOAS-VINDAS UTILIZADOR NOVO -->
      <div v-if="isNewUser" class="card welcome-card">
        <h2>👋 Bem-vindo!</h2>
        <p>
          Cria a tua primeira atividade
          e começa a ganhar XP.
        </p>

        <router-link to="/estudo" class="btn">
          Criar primeira atividade
        </router-link>
      </div>

      <!-- CARD: NÍVEL + XP -->
      <div class="card level-card">
        <h2>Nível {{ perfil.nivel }}</h2>

        <p>{{ perfil.xp }} XP</p>
        <p>
          Faltam <strong>{{ perfil.xpProximoNivel }}</strong> XP para o próximo nível
        </p>

        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: xpPercentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- CARD: STREAK -->
      <div class="card">
        <h2>🔥 Streak</h2>

        <p v-if="perfil.streak.atual === 0">
          Ainda não tens uma streak ativa.
          Estuda hoje para começares!
        </p>

        <p v-else class="big">
          {{ perfil.streak.atual }} dias seguidos 🔥
        </p>
      </div>

      <!-- CARD: ESTATÍSTICAS -->
      <div class="card">
        <h2>📊 Estatísticas</h2>

        <ul v-if="store.currentUser?.Recap?.length > 0">
          <li>Ações realizadas: {{ store.currentUser?.Recap?.length }}</li>
          <li>XP total: {{ perfil.xp }}</li>
          <li>Total de atividades: {{ atividades.length }}</li>
        </ul>

        <p v-else>
          As estatísticas vão aparecer aqui à medida que usares a app.
        </p>
      </div>

      <!-- CARD: ÚLTIMAS TAREFAS COMPLETADAS -->
      <div class="card">
        <h2>✔ Últimas tarefas completadas</h2>

        <ul v-if="lastCompleted.length">
          <li v-for="act in lastCompleted" :key="act.id">
            {{ act.nome || 'Atividade sem nome' }}
          </li>
        </ul>

        <p v-else-if="atividades.length === 0">
          Ainda não completaste nenhuma tarefa.
        </p>

        <p v-else>
          Já criaste atividades, agora é hora de estudar 😉
        </p>
      </div>

      <!-- CARD: TAREFAS CRIADAS RECENTEMENTE -->
      <div class="card">
        <h2>📝 Tarefas criadas recentemente</h2>

        <ul v-if="lastCreated.length">
          <li v-for="act in lastCreated" :key="act.id">
            {{ act.nome || 'Atividade sem nome' }}
          </li>
        </ul>

        <p v-else>
          Ainda não criaste nenhuma atividade.
        </p>
      </div>

      <!-- CARD: TEMPO TOTAL DE ESTUDO -->
      <div class="card">
        <h2>⏱️ Tempo total de estudo</h2>

        <p v-if="totalStudyTime > 0" class="big">
          {{ totalStudyTime }} min
        </p>

        <p v-else>
          O teu tempo de estudo vai aparecer aqui.
        </p>
      </div>

      <!-- CARD: ATIVIDADE MAIS ESTUDADA -->
      <div class="card">
        <h2>🧠 Atividade mais estudada</h2>

        <p v-if="mostStudiedActivity">
          {{ mostStudiedActivity.nome || 'Atividade sem nome' }}
        </p>

        <p v-else>
          Ainda não há dados suficientes.
        </p>
      </div>

      <!-- CALL TO ACTION -->
      <div class="card cta-card">
        <h2>🚀 Continuar</h2>
        <p>Pronto para mais uma sessão de estudo?</p>

        <router-link to="/estudo" class="btn">
          Começar agora
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

export default {
  computed: {
    store() {
      return useUserStore()
    },

    isAuthenticated() {
      return this.store.isAuthenticated
    },

    perfil() {
      return this.store.perfil
    },

    atividades() {
      return this.store.acts || []
    },

    isNewUser() {
      return (
        this.isAuthenticated &&
        this.atividades.length === 0 &&
        this.perfil.xp === 0
      )
    },

    xpPercentage() {
      const total = this.perfil.xp + this.perfil.xpProximoNivel
      return total > 0
        ? (this.perfil.xp / total) * 100
        : 0
    },

    lastCompleted() {
      return [...this.atividades]
        .filter(a => a.historico && a.historico.length > 0)
        .slice(-4)
        .reverse()
    },

    lastCreated() {
      return [...this.atividades]
        .slice(-4)
        .reverse()
    },

    totalStudyTime() {
      if (!this.store.currentUser?.Recap) return 0
      return this.store.currentUser.Recap
        .reduce((acc, r) => acc + r.Time, 0)
    },

    mostStudiedActivity() {
      const recap = this.store.currentUser?.Recap
      if (!recap || recap.length === 0) return null

      const map = {}
      recap.forEach(r => {
        map[r.Id] = (map[r.Id] || 0) + r.Time
      })

      let maxId = null
      let maxTime = 0

      for (const id in map) {
        if (map[id] > maxTime) {
          maxTime = map[id]
          maxId = id
        }
      }

      return this.atividades.find(a => a.id === maxId)
    }
  }
}
</script>



<style lang="scss" scoped>
.home {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
}

.level-card {
  background: linear-gradient(135deg, #42b883, #2c8f6b);
  color: white;
}

.welcome-card {
  background: #f0f9f6;
  border-left: 6px solid #42b883;
}

.cta-card {
  text-align: center;
}

.big {
  font-size: 1.6rem;
  font-weight: bold;
}

.progress-bar {
  margin-top: 1rem;
  height: 10px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #ffffff;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: #42b883;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}

.not-logged {
  padding: 2rem;
  text-align: center;
  font-size: 1.1rem;
}
</style>
