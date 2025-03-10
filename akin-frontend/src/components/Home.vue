<template>
  <div class="container-home">
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else>
      <h2>Lista de Usuários</h2>
      <button @click="showCreateModal()" class="create">
        Criar Novo Usuário
      </button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Último Acesso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.username">
            <td>{{ client.name }} {{ client.lastName }}</td>
            <td>{{ client.username }}</td>
            <td>{{ client.email }}</td>
            <td>{{ formatDate(client.lastAccess) }}</td>
            <td>
              <button @click="editUser(client)">Editar</button>
              <button @click="HandleDeleteUser(client.id)" class="delete">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ isEditMode ? "Editar Usuário" : "Criar Novo Usuário" }}</h2>

        <div>
          <label>Nome:</label>
          <input v-model="selectedUser.name" type="text" />

          <label>Sobrenome:</label>
          <input v-model="selectedUser.lastName" type="text" />
        </div>

        <div>
          <label>Gênero:</label>
          <select v-model="selectedUser.gender">
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>

          <label>Data de Nascimento:</label>
          <input v-model="selectedUser.birthDate" type="date" />
        </div>

        <label>Email:</label>
        <input v-model="selectedUser.email" type="email" />

        <label>Avatar:</label>
        <input v-model="selectedUser.avatar" type="text" />

        <label>Usuário:</label>
        <input
          v-model="selectedUser.username"
          type="text"
          :disabled="isEditMode"
        />

        <label>Função:</label>
        <select v-model="selectedUser.role">
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <button
          @click="isEditMode ? handelUpdateUser() : handleCreateUser()"
          class="create"
        >
          Salvar
        </button>
        <button @click="showModal = false" class="delete">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { createUser, deleteUser, getUsers, updateUser } from "@/services/api";
import type { User } from "@/types/user";
import { useUserStore } from "@/stores/user";

const clients = ref<User[]>([]);
const error = ref<string | null>(null);
const userStore = useUserStore();

const showModal = ref(false);
const selectedUser = ref<User | "">("");
const isEditMode = ref(false);

const user = userStore.user;

async function fetchUsers(token: string) {
  try {
    clients.value = await getUsers(token);
  } catch (err) {
    error.value = "Erro ao carregar usuários";
    console.error(err);
  }
}

async function showCreateModal() {
  isEditMode.value = false;
  showModal.value = true;
}

async function handleCreateUser() {
  try {
    await createUser(selectedUser?.value);
    console.log("teste");

    clients.value = clients.value.map((client) =>
      client.username === selectedUser.value?.username
        ? selectedUser.value
        : client
    );
    showModal.value = false;
  } catch (err) {
    error.value = "Erro ao atualizar usuário";
    console.error(err);
  }
}

async function HandleDeleteUser(id: number) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    try {
      await deleteUser(id, user?.accessToken);
      clients.value = clients.value.filter(
        (client) => client.username !== username
      );
    } catch (err) {
      error.value = "Erro ao excluir usuário";
      console.error(err);
    }
  }
}

function editUser(user: User) {
  isEditMode.value = true;
  selectedUser.value = { ...user };
  showModal.value = true;
}

async function handelUpdateUser() {
  if (selectedUser.value) {
    try {
      await updateUser(selectedUser.value, user?.accessToken);
      clients.value = clients.value.map((client) =>
        client.username === selectedUser.value?.username
          ? selectedUser.value
          : client
      );
      showModal.value = false;
    } catch (err) {
      error.value = "Erro ao atualizar usuário";
      console.error(err);
    }
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Nunca acessou";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR")
  );
}

// Buscar os usuários quando o componente for montado
onMounted(() => {
  if (user) {
    fetchUsers(user.accessToken);
  }
});
</script>

<style scoped>
.container-home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px;
  height: 100vh;
  background-color: #596bab;
  align-items: center;
  color: white;
}

input {
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 15px;
}

select {
  width: 100px;
  padding: 8px;
  margin-bottom: 15px;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
}

label {
  color: black;
  font-weight: bold;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #444;
}

th,
td {
  padding: 10px;
  border: 1px solid white;
  text-align: left;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.delete {
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 8px;
}

.create {
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 8px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
}
</style>
