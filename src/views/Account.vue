<template>
  <div v-if="$store.getters.user != null">
    <h1>Welcome {{$store.getters.user.name}} admin: {{$store.getters.user.admin}}</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
