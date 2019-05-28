<template>
  <div>
    <div>
      <v-flex xs10 offset-xs1 pa-2 v-bind:key="car.verhicleListingId" v-for="car in result">
        <CarOverview v-bind:car="car"/>
      </v-flex>
    </div>
  </div>
</template>

<script>
import CarOverview from "./CarOverview.vue";

export default {
  name: "search-results",
  props: ["query"],
  components: {
    CarOverview
  },
  data() {
    return {
      result: null
    };
  },
  created() {
    var query = this.query ? this.query : window.location.search;
    console.log("hey", query, eval(this.query), window.location.search);
    axios
      .get(
        "https://localhost:44347/api/vehiclesearch/listings/limited/" + query
      )
      .then(response => (this.result = response.data))
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
</style>


