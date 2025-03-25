<template>
  <div class="login-signup-container">
    <form class="login-signup-form" @submit.prevent="login">
      <h1>Login</h1>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
      <a href="/signup">Don't have an account? Sign up</a>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from '../services/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user_id', response.data.user_id) // Almacena el ID del usuario
        this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.error = 'Email o contraseña incorrectos.'
        } else {
          this.error = 'Error al iniciar sesión. Por favor, intenta de nuevo.'
        }
        console.error(error)
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>