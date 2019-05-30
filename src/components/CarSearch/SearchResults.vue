<template>
  <div>
    <div v-if="result && result.length > 0">
      <v-flex grow pa-2 v-bind:key="car.verhicleListingId" v-for="car in result">
        <CarOverview v-bind:car="car"/>
      </v-flex>
    </div>
    <v-flex v-else style="text-align: center;">
      <h2>Geen resultaten</h2>
    </v-flex>
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
    axios
      .get(
        "https://localhost:44347/api/vehiclesearch/listings/limited/" + query
      )
      .then(response => {
        this.result = response.data;
        console.log(this.result);
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
</style>


