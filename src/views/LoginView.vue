<template>
  <div class="login-signup-container">
    <form class="login-signup-form" @submit.prevent="login">
      <h1>Login</h1>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
      <a href="/signup">Don't have an account? Sign up</a>
    </form>
  </div>
</template>
<script>
import axios from '../services/api'

export default {
  data() {
    return {
      email: '',
      password: ''
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
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>