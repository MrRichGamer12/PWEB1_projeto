<script setup>
import { ref, onMounted } from 'vue'
import { get, post, del } from '@/api/api'

// Estado
const users = ref([])
const newUser = ref({ username: '', password: '', cargo: 0 })

// Funções
const loadUsers = async () => {
  users.value = await get('/users')
}

const addUser = async () => {
  if (!newUser.value.username || !newUser.value.password) {
    alert('Preencha todos os campos!')
    return
  }

  try {
    const created = await post('/users', newUser.value)
    users.value.push(created)
    newUser.value = { username: '', password: '', cargo: 0 }
  } catch (err) {
    console.error(err)
    alert('Erro ao adicionar utilizador')
  }
}

const removeUser = async (id) => {
  if (!confirm('Tens a certeza?')) return
  await del(`/users/${id}`)
  users.value = users.value.filter(u => u.id !== id)
}

onMounted(loadUsers)
</script>

<template>
  <main class="admin-container">
    <h1>Área de Administração</h1>

    <!-- FORMULÁRIO ADICIONAR USUÁRIO -->
    <section class="add-user-form">
      <input v-model="newUser.username" placeholder="Username" />
      <input v-model="newUser.password" type="password" placeholder="Password" />
      <select v-model.number="newUser.cargo">
        <option :value="0">User</option>
        <option :value="1">Admin</option>
      </select>
      <button class="btn-add" @click="addUser">Adicionar</button>
    </section>

    <!-- TABELA -->
    <table class="admin-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.username }}</td>
          <td>{{ u.cargo === 1 ? 'Admin' : 'User' }}</td>
          <td>
            <button class="btn-delete" @click="removeUser(u.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped lang="scss">
.admin-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-family: 'Verdana', sans-serif;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
}

/* FORMULÁRIO ADICIONAR */
.add-user-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  input, select {
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  .btn-add {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 12px 15px;
  }

  thead {
    background-color: #4CAF50;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  tbody tr {
    border-bottom: 1px solid #ddd;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  td {
    vertical-align: middle;
  }

  .btn-delete {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c0392b;
    }
  }
}

/* Responsivo */
@media (max-width: 600px) {
  .add-user-form {
    flex-direction: column;

    input, select, .btn-add {
      width: 100%;
    }
  }

  .admin-table th, .admin-table td {
    padding: 8px 10px;
  }

  .btn-delete {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
