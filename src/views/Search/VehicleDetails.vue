<template>
  <v-container fluid v-if="vehicle">
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <h3 class="headline">
              <v-icon @click="$router.go(-1)">keyboard_arrow_left</v-icon>
              {{vehicle.make}} {{vehicle.model}} {{vehicle.version}}
            </h3>
          </v-card-title>
          <v-layout row wrap>
            <v-flex md9 xs12 pa-2>
              <v-carousel>
                <v-carousel-item
                  v-for="(item,i) in vehicle.images"
                  :key="i"
                  :src="`data:image/png;base64,${item.src}`"
                />
              </v-carousel>
            </v-flex>
            <v-flex md3 xs12 pa-2>
              <v-layout px-2 fill-height>
                <v-flex>
                  <v-card>
                    <v-card-text>
                      <p class="headline">
                        <v-icon>money</v-icon>
                        {{vehicle.price}}
                      </p>
                      <p class="headline">
                        <v-icon>access_time</v-icon>
                        {{vehicle.mileage}}
                      </p>
                      <p class="headline">
                        <v-icon>calendar_today</v-icon>
                        {{vehicle.registrationDate}}
                      </p>
                      <p class="headline">
                        <v-icon>show_chart</v-icon>
                        {{vehicle.power}}
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
                  <component :is="tab.component" v-bind:vehicle="vehicle"/>
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
import Contact from "../../components/Search/Tabs/Contact.vue";
import Options from "../../components/Search/Tabs/Options.vue";
import Description from "../../components/Search/Tabs/Description.vue";
import Forum from "../../components/Search/Tabs/Forum.vue";

export default {
  name: "vehicle-details",
  components: { Information, Options, Contact, Description, Forum },
  data() {
    return {
      vehicle: null,
      tabs: [
        {
          title: "Informatie",
          component: Information
        },
        {
          title: "Opties",
          component: Options
        },
        {
          title: "Beschrijving",
          component: Description
        },
        {
          title: "Contact",
          component: Contact
        },
        {
          title: "Forum",
          component: Forum
        }
      ]
    };
  },
  mounted() {
    axios
      .get("/vehiclelisting/" + this.$route.params.id)
      .then(response => {
        this.vehicle = response.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

