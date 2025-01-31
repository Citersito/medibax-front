<template>
  <div class="home-page">
    <div class="profile">
      <NavButton link="/profile" text="¡Hola {{ user }}!" icon="person"/>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import NavButton from '@/components/NavButton.vue';

export default {
  components: {
    NavButton,
  },
  setup() {
    const user = ref('');

    onMounted(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user.value = storedUser;
      }
      console.log('User:', user.value); // Agregar console.log para verificar el valor de user
    });

    return {
      user,
    };
  },
};
</script>
