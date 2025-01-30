<template>
  <div class="layout">
    <NavView/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import NavView from "./NavView.vue";

export default {
  components: {
    NavView,
  },
};
</script>
