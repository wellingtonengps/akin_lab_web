<template>
  <div class="container-home">
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else>
      <h2>Lista de Usuários</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          <strong>{{ user.name }} {{ user.lastName }}</strong> -
          {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getUsers } from "@/services/api";
import type { User } from "@/types/user";

const users = ref<User[]>([]);
const error = ref<string | null>(null);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJha2luLWJhY2tlbmQiLCJ1c2VybmFtZSI6IndlbGxpbmd0b24uc2lsdmEiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3NDEzOTQ1NTZ9.Cg9IOjGQNxf2TocCJTQ_FonixQg6N3fDbR7ppVbhT_A";

async function fetchUsers(token: string) {
  try {
    users.value = await getUsers(token);
  } catch (err) {
    error.value = "Erro ao carregar usuários";
    console.error(err);
  }
}

// Buscar os usuários quando o componente for montado
onMounted(() => {
  fetchUsers(token);
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

.error {
  color: red;
  font-weight: bold;
}
</style>
