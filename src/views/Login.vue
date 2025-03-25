<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import apiClient from "@/services/api";

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/login', {
          username: this.username,
          password: this.password
        });
        // Guardar el token en el localStorage
        localStorage.setItem('token', response.data.access_token);
        // Redirigir al usuario a la página principal
        this.$router.push('/');
        // Recargar la página para actualizar la navegación
        window.location.reload();
      } catch (err) {
        // Mostrar mensaje de error si las credenciales son inválidas
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>
