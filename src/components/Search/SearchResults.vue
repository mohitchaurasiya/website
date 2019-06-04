<template>
  <div>
    <div v-if="result && result.length > 0">
      <v-flex pb-2 grow v-bind:key="listing.verhicleListingId" v-for="listing in result">
        <VehicleOverview v-bind:listing="listing"/>
      </v-flex>
    </div>
    <v-flex v-else style="text-align: center;">
      <h2>Geen resultaten</h2>
    </v-flex>
  </div>
</template>

<script>
import VehicleOverview from "./VehicleOverview.vue";

export default {
  name: "search-results",
  props: ["query"],
  components: {
    VehicleOverview
  },
  data() {
    return {
      result: null
    };
  },
  created() {
    var query = this.query ? this.query : window.location.search;
    axios
      .get("https://localhost:44347/api/vehiclelisting/listings/" + query)
      .then(response => {
        this.result = response.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
</style>


