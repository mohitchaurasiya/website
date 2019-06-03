<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Opties</h3>
      {{listing}}
    </v-card-title>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["listing"]
};
</script>

