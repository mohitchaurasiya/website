<template>
  <v-container fluid>
    <CarSalesOptions/>
  </v-container>
</template>

<script>
import CarSalesOptions from "../../components/Sales/Options.vue";

export default {
  name: "vehicle-sales",
  components: {
    CarSalesOptions
  }
};
</script>

<style scoped>
</style>
