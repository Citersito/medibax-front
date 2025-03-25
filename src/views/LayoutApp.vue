<template>
  <div class="layout">
    <NavView/>
<!--    <TestCon />-->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import NavView from "./NavView.vue";
import TestCon from "@/components/TestCon.vue";
export default {
  components: {
    NavView, TestCon,
  },
};
</script>
