<template>
  <v-card>
    <div v-if="show">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in images"
          :key="i"
          :src="`data:image/png;base64,${item}`"
        />
      </v-carousel>
    </div>
    <div v-else>
      <v-img height="300px" :src="`data:image/png;base64,${listing.previewImage}`"/>
      <!-- listing.image  -->
    </div>
    <v-card-title primary-title>
      <div>
        <div
          class="headline"
        >{{listing.vehicle.make.name}} {{listing.vehicle.makeModel.name}} {{listing.vehicle.version}}</div>
        <span class="grey--text">€{{listing.price}} - {{listing.vehicle.mileage}}km</span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat>Delen</v-btn>
      <v-btn flat color="purple" :to="`/zoeken/voertuig/${listing.vehicleListingId}`">Bekijken</v-btn>
      <v-btn
        flat
        color="green"
        :to="`/account/advertenties/aanpassen/${listing.vehicleListingId}`"
      >Aanpassen</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="fetchImages">
        <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text v-show="show">{{listing.vehicle.description}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "user-listing-overview",
  props: ["listing"],
  data() {
    return {
      show: false,
      images: []
    };
  },
  methods: {
    fetchImages() {
      this.show = !this.show;
      if (this.images.length == 0) {
        //this.images.push(this.listing.image);
        axios
          .get(
            `/vehiclelisting/listing/${this.listing.vehicleListingId}/images`
          )
          .then(response => {
            this.images = response.data;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
