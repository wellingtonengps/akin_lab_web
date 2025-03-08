<template>
  <v-app id="inspire">
    <v-main>
      <div class="container">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Faz com que ocupe toda a altura da tela */
}
</style>
