<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">{{vehicle.contactInfo.title}}</h3>
    </v-card-title>
    <v-card-text>
      <v-layout wrap>
        <v-flex 12 md6 xs v-for="info in vehicle.contactInfo.vehicleListingData" :key="info.header">
          <b>{{info.header}}</b>
          <br>
          {{info.value}}
          <br>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["vehicle"]
};
</script>

