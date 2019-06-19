<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Contact</h3>
    </v-card-title>
    <v-card-text>
      <div>
        <b>Locatie</b>
        <br>
        {{listing.contactDetails.city}}, {{listing.contactDetails.country.name}}
      </div>
      <div v-if="listing.contactDetails.showNumber">
        <b>Telefoon nummer</b>
        <br>
        {{listing.contactDetails.phoneNumber}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "information-tab",
  props: ["listing"]
};
</script>

