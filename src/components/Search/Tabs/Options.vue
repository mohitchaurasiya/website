<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Opties</h3>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs6 md3 v-for="(option, i) in vehicle.options" :key="i">
          <span>
            <v-icon>checked</v-icon>
            {{stringify(option)}}
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import stringify from "../../../mixins/stringify.vue";
export default {
  name: "information-tab",
  props: ["vehicle"],
  mixins: [stringify]
};
</script>

