<template>
  <nav class="navbar">
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavButton from '@/components/NavButton.vue';

export default {
  components: {
    NavButton,
  },
  setup() {
    const route = useRoute();
    const menuItems = ref([
      { icon: 'search-circle-outline', text: 'Analisis', link: '/prediction' },
      { icon: 'home-outline', text: 'Inicio', link: '/' },
      { icon: 'clipboard-outline', text: 'Expediente', link: '/expediente' },
      { icon: 'clipboard-outline', text: 'Profile', link: '/profile' },

    ]);

    const isActive = (link) => route.path === link;
    const getIcon = (icon, link) => (isActive(link) ? icon.replace('-outline', '') : icon);

    return {
      menuItems,
      isActive,
      getIcon,
    };
  },
};
</script>