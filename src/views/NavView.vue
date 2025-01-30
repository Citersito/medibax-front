<template>
  <nav v-if="isLoggedIn" class="navbar">
    <NavButton
        v-for="(item, index) in menuItems"
        :key="index"
        :icon="getIcon(item.icon, item.link)"
        :text="item.text"
        :link="item.link"
        :class="`item-${index + 1}`"
        :active="isActive(item.link)"
    />
  </nav>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import NavButton from '@/components/NavButton.vue';

export default {
  components: {
    NavButton,
  },
  setup() {
    const route = useRoute();

    const menuItems = ref([
      {icon: 'search-circle-outline', text: 'Analisis', link: '/analisis'},
      {icon: 'home-outline', text: 'Inicio', link: '/'},
      {icon: 'clipboard-outline', text: 'Expediente', link: '/expediente'},
    ]);

    const isActive = (link) => route.path === link;

    const getIcon = (icon, link) => (isActive(link) ? icon.replace('-outline', '') : icon);

    const isLoggedIn = ref(!!localStorage.getItem('token'));

    const login = () => {
      localStorage.setItem('token', 'dummy-token');
      isLoggedIn.value = true;
      console.log('Usuario ha iniciado sesión');
    };
    onMounted(() => {
      if (isLoggedIn.value) {
        console.log('Usuario activo');
      } else {
        console.log('No hay ningún usuario activo');
      }
    });

    return {
      menuItems,
      isActive,
      getIcon,
      isLoggedIn,
      login,
    };
  },
};
</script>
