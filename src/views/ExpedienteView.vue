<template>
  <div class="Expediente">
      <NavButton link="/profile" text="¡Hola {{ user }}!" icon="person"/>
      <div>
        <ion-icon name="add-circle-outline" class="ME"></ion-icon>
      </div>
  </div>
  <div class="E">
    <p>Expiedientes</p>
  </div>
  <div class="EG">
    <p>Expediente general</p>
  </div>
  <div class="CV">
    <p>Cartilla de vacunacion</p>
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
