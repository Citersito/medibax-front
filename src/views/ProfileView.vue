<template>
  <h1>Profile</h1>
  <button @click="logout" class="LO">Cerrar Sesión</button>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      // Eliminar el token y los datos del usuario de localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirigir a la página de inicio de sesión
      window.location.reload();
      router.push({name: 'Login'});
    };

    return {
      logout,
    };
  },
};
</script>
