<template>
  <router-link :to="link" class="nav-button">
    <div class="navbar-item">
      <ion-icon v-if="icon" :name="icon" style="font-size: 25px;" class="ii"></ion-icon>
      <p>{{ text }}</p></div>
  </router-link>

</template>
<script>
export default {
  props: {
    icon:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true
    },
    link:{
      type: String,
      required: true
    }
  }
}
</script>