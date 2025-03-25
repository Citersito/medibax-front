<template>
  <div class="home-page">
    <div class="profile">
      <NavButton link="/profile" text="¡Hola {{ user }}!" icon="person"/>
    </div>
    <div class="i">
      <p>Resumen</p>
    </div>
    <div class="i1">
      <ion-icon name="moon" color="yellow"></ion-icon>
    </div>
    <div class="i2">
      <ion-icon name="heart" color="red"></ion-icon>
    </div>
    <div class="idown">
      <div class="i3">
        <ion-icon name="walk" color="white"></ion-icon>
      </div>
      <div class="i4">
        <ion-icon name="trending-up" color="white"></ion-icon>
      </div>
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
