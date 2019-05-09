<template>
  <Login v-bind:redirectUrl="'/account'"/>
</template>

<script>
import Login from "../components/Login.vue";

export default {
  name: "LoginPage",
  components: { Login },
  created() {
    if (this.$store.getters.loggedIn) {
      this.$router.replace("/account");
    }
  }
};
</script>

<style scoped>
</style>
