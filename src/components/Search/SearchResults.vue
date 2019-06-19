<template>
  <div>
    <v-layout wrap row v-if="result && result.length > 0">
      <v-flex
        xs12
        pb-2
        class="relative"
        grow
        v-bind:key="listing.verhicleListingId"
        v-for="listing in result"
      >
        <VehicleOverview v-bind:listing="listing"/>
      </v-flex>
    </v-layout>
    <v-flex v-else style="text-align: center;">
      <h2>Geen resultaten</h2>
    </v-flex>
    <PagingNavigation
      ref="navigation"
      :end-point="`/vehiclelisting/listings/2/{page}${this.query ? this.query : vueWindow.search}`"
      page-location="/zoeken/"
      v-on:updateList="updateList"
    />
  </div>
</template>

<script>
import VehicleOverview from "./VehicleOverview.vue";
import PagingNavigation from "../PagingNavigation";

export default {
  name: "search-results",
  props: ["query"],
  components: {
    VehicleOverview,
    PagingNavigation
  },
  data() {
    return {
      result: null
    };
  },
  methods: {
    updateList(list) {
      this.result = list;
    }
  },
  created() {
    // this.query =
    // axios
    //   .get("/vehiclelisting/listings/" + query)
    //   .then(response => {
    //     this.result = response.data;
    //   })
    //   .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
</style>


