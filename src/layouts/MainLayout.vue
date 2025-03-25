<template>
  <div>
    <router-view />
    <NavView />
  </div>
</template>

<script>
import NavView from "@/views/NavView.vue";
export default {
 components: {
    NavView,
 }
}
</script>