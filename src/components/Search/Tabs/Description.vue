<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Beschrijving</h3>
    </v-card-title>
    <v-card-text>{{listing.vehicle.description}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["listing"]
};
</script>

