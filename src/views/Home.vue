<template>
<div id="app">
  <v-app>
    <h1>aaaa</h1>
    <h1>aaaa</h1>
    <h1>aaaa</h1>
    <p v-bind:key="car" v-for="car in info">
      {{car}}
    </p>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => (this.info = response))
  }
}
</script>

<style scoped>

</style>
