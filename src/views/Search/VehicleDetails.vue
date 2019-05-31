<template>
  <v-container fluid v-if="listing">
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <h3
              class="headline"
            >{{vehicle.makeModel.make.name}} {{vehicle.makeModel.name}} {{vehicle.version}}</h3>
          </v-card-title>
          <v-layout row wrap>
            <v-flex md9 xs12 pa-2>
              <v-carousel>
                <v-carousel-item v-for="(item,i) in images" :key="i" :src="item"/>
              </v-carousel>
            </v-flex>
            <v-flex md3 xs12 pa-2>
              <v-layout px-2 fill-height>
                <v-flex>
                  <v-card>
                    <v-card-text>
                      <p class="headline">
                        <v-icon>access_time</v-icon>
                        {{vehicle.mileage}}km
                      </p>
                      <p class="headline">
                        <v-icon>calendar_today</v-icon>
                        {{vehicle.registrationDate.split('T')[0]}}
                      </p>
                      <p class="headline">
                        <v-icon>show_chart</v-icon>
                        {{vehicle.registrationDate.split('T')[1]}}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-text>
            <v-tabs slider-color="blue darken-3">
              <v-tab v-for="tab in tabs" v-bind:key="tab.title">{{tab.title}}</v-tab>
              <v-tab-item v-for="tab in tabs" v-bind:key="tab.title">
                <v-card flat>
                  <component :is="tab.component"/>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Information from "../../components/Search/Tabs/Information.vue";

export default {
  name: "vehicle-details",
  components: { Information },
  data() {
    return {
      vehicle: null,
      listing: null,
      tabs: [
        {
          title: "Informatie",
          component: Information
        },
        {
          title: "Opties",
          component: Information
        },
        {
          title: "Beschrijving",
          component: Information
        },
        {
          title: "Contact",
          component: Information
        }
      ],
      images: [
        require("../../images/image_no_license.png"),
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
        "https://localhost:44347/api/vehiclesearch/listing/" +
          this.$route.params.id
      )
      .then(response => {
        this.listing = response.data;
        this.vehicle = this.listing.vehicle;
        console.log(this.listing);
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
</style>
