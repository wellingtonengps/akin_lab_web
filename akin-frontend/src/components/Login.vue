<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Carregando..." : "Entrar" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/services/api"; // Certifique-se de que a função loginUser esteja importada corretamente
import { useUserStore } from "@/stores/user";
import type { AuthResponse } from "@/types/authResponse";

// Reactive data
const username = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

const userStore = useUserStore();

// Router instance
const router = useRouter();

// Função para lidar com o login
async function handleLogin() {
  loading.value = true;
  error.value = null;

  try {
    // Chame a função loginUser passando os dados de username e password
    const response: AuthResponse = await loginUser({
      username: username.value,
      password: password.value,
    });

    // Salve o token ou outras informações necessárias no localStorage
    userStore.setUser(response);
    error.value = null;
    // Redirecionar para a página inicial após login bem-sucedido
    router.push("/home");
  } catch (err) {
    loading.value = false;
    error.value = "Credenciais inválidas. Tente novamente.";
    console.error(err);
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fb;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
