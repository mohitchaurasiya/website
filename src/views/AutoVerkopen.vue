<template>
  <Login v-if="!$store.getters.loggedIn" v-bind:redirectUrl="'/autoverkopen'"/>
  <div v-else>
    <h1>hi</h1>
  </div>
</template>

<script>
import Login from "../components/Login.vue";

export default {
  name: "auto-verkopen",
  components: {
    Login
  }
};
</script>

<style scoped>
</style>
