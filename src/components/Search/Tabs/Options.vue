<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Opties</h3>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex
          xs6
          md3
          v-for="option in listing.vehicle.vehicleEquipmentOptions"
          :key="option.equipmentOptionId"
        >
          <span>
            <v-icon>checked</v-icon>
            {{option.equipmentOption.name}}
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["listing"]
};
</script>

