<template>
  <v-card>
    <div v-if="show">
      <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item,i) in images" :key="i" :src="item"/>
      </v-carousel>
    </div>
    <div v-else>
      <v-img height="300px" :src="images[Math.floor(Math.random() * images.length)]"/>
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
      <v-btn flat>Share</v-btn>
      <v-btn flat color="purple" :to="`zoeken/voertuig/${listing.vehicleListingId}`">Bekijken</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text
      v-show="show"
    >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "vehicle-overview",
  props: ["listing"],
  data() {
    return {
      show: false,
      images: [
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        ),
        this.getImage(
          Math.floor(Math.random() * 500) + 400,
          Math.floor(Math.random() * 200) + 100
        )
      ]
    };
  },
  methods: {
    getImage(w, h) {
      return `https://placebear.com/${w}/${h}`;
    }
  }
};
</script>

<style scoped>
</style>
