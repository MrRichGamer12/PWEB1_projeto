<template>
  <div>
    <button class="addAtvButt" @click="addTaref = true">+</button>
    <br />
    <div v-if="addTaref" class="overlay">
      <div class="add-tarefa" v-if="addTaref">
        <button class="close-btn" @click="close()">X</button>
        <h2 class="titulo-modal">Novo Plano de Estudo</h2>
        <div class="form-group">
          <label>Nome:</label>
          <input type="text" v-model="novaTarefa.nome" />
        </div>
        <div class="form-group">
          <label>Disciplina:</label>
          <input type="text" v-model="novaTarefa.disciplina" />
        </div>
        <div class="form-group">
          <label>Nº de Horas:</label>
          <input class="input-number-atv" type="number" v-model="novaTarefa.meta" />
        </div>
        <div class="form-group">
          <label>Início do período:</label>
          <input type="date" v-model="novaTarefa.inicio" />
        </div>
        <div class="form-group">
          <label>Fim do período:</label>
          <input type="date" v-model="novaTarefa.fim" />
        </div>
        <div class="form-group">
          <label>Descrição:</label>
          <input type="text" v-model="novaTarefa.descricao" />
        </div>
        <button class="submit-btn" @click="submit">Guardar</button>
      </div>
    </div>
    <br />
    <div v-if="currentUser?.atividades?.length > 0">
      <h3>Os teus planos de estudo:</h3>
      <div class="box_cards">
        <div v-for="atividade in currentUser.atividades" :key="atividade.id">
          <div class="Card">
            <RouterLink :to="`/estudo/${atividade.id}`"><button class="card-button">Começar</button></RouterLink>
            <strong class="Titulo-card">{{ atividade.nome }}</strong>
            <p class="disciplina-card">{{ atividade.disciplina }}</p>
            <!--Nota Para identificar o ${} no vue tem que ser em "`${abc}`" para funcionar-->
            <p>Meta:{{ this.realMeta(atividade.meta) }}h</p>
            <p>{{ atividade.inicio }}</p>
            <p>{{ atividade.fim }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>
        Ainda não tens nenhum plano de estudo clique no botão "+" para adicionar um novo plano de estudo
      </h3>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      addTaref: false,
      novaTarefa: {
        nome: '',
        disciplina: '',
        descricao: '',
        meta: 0,
        inicio: '',
        fim: '',
      },
    }
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(useUserStore, ['addAct']),
    close() {
      this.addTaref = false
      this.limpForm()
      console.log(this.currentUser?.atividades?.length)
    },
    async submit() {
      //passar de segundos para horas
      this.novaTarefa.meta *= 3600
      // Chama a função da store para adicionar atividade
      const success = await this.addAct(this.novaTarefa)
      console.log(this.novaTarefa, success)

      if (success) {
        this.addTaref = false
        this.limpForm()
      } else alert('Tem algo errado')
    },
    limpForm() {
      this.novaTarefa = {
        nome: '',
        disciplina: '',
        descricao: '',
        meta: 0,
        inicio: '',
        fim: '',
      }
    },
    realMeta(i) {
      console.log(i)
      return i / 3600
    },
  },
}
</script>

<style scoped>
h3 {
  font-size: 22px;
  font-weight: 700;
  text-align: left;

  padding: 12px 18px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 10px;

  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);

  width: fit-content;
}
.box_cards{
  margin-top: 20px;
  display: flex;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* estado inicial */
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* garantir que fica por cima */
  animation: blurIn 0.4s ease forwards;
}
.add-tarefa {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 30px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Título */
.titulo-modal {
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

/* Botão de fechar */
.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Cada linha do formulário */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Labels */
.form-group label {
  font-weight: 600;
  font-size: 14px;
}

/* Inputs */
.form-group input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.6);
}

  /* Botão submit */
.submit-btn {
  margin-top: 10px;
  padding: 10px;
  background: #2d2d2d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
    font-weight: bold;
  }

  .submit-btn:hover {
    background: #444;
  }

  .input-number-atv{
    min-width: 10%;
    max-width: auto;
  }
.Card {
  position: relative;
  min-width: 280px;
  padding: 20px;

  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);

  margin-left: 30px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  transition: transform 0.25s ease, background 0.25s ease;
}

.Card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.35);
}

.card-button {
  position: absolute;
  top: 12px;
  right: 12px;

  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;

  background: rgba(0, 0, 0, 0.4);
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  transition: background 0.25s ease;
}

.card-button:hover {
  background: rgba(0, 0, 0, 0.6);
}
.Titulo-card {
   display: block;
    width: 70%;
    height: auto;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.disciplina-card {
  font-size: 13px;
  color: #444;
  margin: 0 0 8px 0;
}

  .addAtvButt {
    position: absolute;
    top: 10%;
    right: 3%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    background: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #2d2d2d;
    border-radius: 8px;
    /* quadrado com cantos suaves */
    cursor: pointer; box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);
    backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
    transition: all 0.25s ease;
  }
  .addAtvButt:hover {
    background: linear-gradient(135deg, #42b883, #2c8f6b);
    color: white;
    transform: scale(1.07);
  }
  /* Animação do blur progressivo */
  @keyframes blurIn {
    0% {
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      background: rgba(0, 0, 0, 0);
    }
    100% {
      backdrop-filter: blur(5px);
      /* blur final */
      -webkit-backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.2);
    }
  }
  /* Pop-up suave */
  @keyframes popup {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
</style>
