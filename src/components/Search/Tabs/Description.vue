<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Beschrijving</h3>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <b>Beschrijving</b>
          <br>
          {{vehicle.description}}
        </v-flex>

        <v-flex xs6>
          <br>
          <b>Positieve punten</b>
          <br>
          <template v-for="(point, i) in vehicle.positivePoints">
            {{point}}
            <br :key="i">
          </template>
        </v-flex>
        <v-flex xs6>
          <br>
          <b>Negatieve punten</b>
          <br>
          <template v-for="(point, i) in vehicle.negativePoints">
            {{point}}
            <br :key="'b' + i">
          </template>
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

