<template>
  <v-container fluid v-if="car" id="wrapper__car-details">
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-carousel>
            <v-container fill-height fluid id="headline-text">
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <p class="headline">
                    <v-icon>access_time</v-icon>
                    {{car.mileage}}km
                  </p>
                  <p class="headline">
                    <v-icon>calendar_today</v-icon>
                    {{car.registrationDate.split('T')[0]}}
                  </p>
                  <p class="headline">
                    <v-icon>show_chart</v-icon>170pk (123kw)
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
            <v-carousel-item v-for="(item,i) in images" :key="i" :src="item"/>
          </v-carousel>
          <v-card-title>{{car.makeModel.make.name}} {{car.makeModel.name}} {{car.version}}</v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "car-details",
  data() {
    return {
      car: null,
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
  mounted() {
    axios
      .get(
        "https://localhost:44347/api/vehiclesearch/car/" + this.$route.params.id
      )
      .then(response => {
        this.car = response.data;
        console.log(this.car);
      })
      .catch(error => console.log(error));
  },
  methods: {
    getImage(w, h) {
      return `https://placebear.com/${w}/${h}`;
    }
  }
};
</script>

<style scoped>
#headline-text {
  position: absolute;
  z-index: 1;
  color: white;
  background-image: radial-gradient(
    circle at top left,
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0) 70%
  );
  background-size: 50%;
}
</style>
