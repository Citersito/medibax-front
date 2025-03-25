<template>
  <div class="login-signup-container">
    <form class="login-signup-form" @submit.prevent="signup">
      <h1>Signup</h1>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Signup</button>
      <a href="/login">Already have an account? Login</a>
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
    async signup() {
      try {
        const response = await axios.post('auth/signup', {
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