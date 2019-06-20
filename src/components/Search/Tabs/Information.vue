<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Informatie over het voertuig</h3>
    </v-card-title>
    <v-card-text>
      <template v-for="(block, i) in vehicle.information">
        <h2 :key="i">{{block.title}}</h2>
        <v-data-table hide-headers :items="block.vehicleListingData" :key="'a' + i" hide-actions>
          <template v-slot:items="row">
            <td>{{row.item.header}}</td>
            <td>{{row.item.value}}</td>
          </template>
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["vehicle"]
};
</script>


<style scoped>
td {
  width: 50%;
}
</style>


