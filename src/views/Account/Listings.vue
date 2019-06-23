<template>
  <v-container fluid id="container">
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <h2 class="headline">Mijn Advertenties</h2>

            <v-spacer/>
            <v-btn
              color="primary"
              :disabled="!$store.getters.authenticated"
              @click="newListing"
              small
            >
              <v-icon>add</v-icon>&nbsp;Advertentie
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout wrap row v-if="result && result.length > 0">
              <v-flex
                xs12
                pb-2
                class="relative"
                grow
                v-bind:key="listing.verhicleListingId"
                v-for="listing in result"
              >
                <UserListingOverview v-bind:listing="listing"/>
              </v-flex>
            </v-layout>
            <v-flex v-else style="text-align: center;">
              <h2>Geen resultaten</h2>
            </v-flex>
            <PagingNavigation
              ref="navigation"
              :end-point="`/vehiclelisting/userListings/5/{page}`"
              :page-location="`/listings/{page}`"
              v-on:updateList="updateList"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserListingOverview from "../../components/UserListingOverview.vue";
import PagingNavigation from "../../components/PagingNavigation";

export default {
  name: "listings",
  components: {
    UserListingOverview,
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
    },
    newListing() {
      this.$router.push("/account/advertenties/nieuw");
    }
  },
  mounted() {
    this.$refs.navigation.page = 1;
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
