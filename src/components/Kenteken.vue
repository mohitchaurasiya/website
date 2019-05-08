<template>
  <div class="license-search">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="license"
          append-icon="search"
          append-outer-icon="delete"
          @click:append-outer="destroy"
          label="Ken-te-ken"
          single-line
          hide-details
          @input="search"
          :maxlength="6"
          style="text-transform:uppercase"
          type="text"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" :value="errorMessage !== ''">{{errorMessage}}</v-alert>
        <div v-if="license && license.length == 6 && errorMessage === ''">
          <div v-bind:key="key" v-for="(value, key) in carInfo">
            <h2>{{stringify(key)}}</h2>
            <v-data-table hide-headers :items="Object.entries(value)" hide-actions>
              <template v-slot:items="row">
                <td>{{stringify(getKey(row))}}</td>
                <td>{{getValue(row)}}</td>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "Kenteken",
  props: ["licenseParams"],
  data() {
    return {
      carInfo: [],
      errorMessage: "",
      license: "",
      previousLicense: ""
    };
  },
  mounted() {
    if (this.licenseParams != null) {
      this.license = this.licenseParams.toUpperCase();
      this.search();
    }
  },
  watch: {
    license: function(val) {
      this.license = val.toUpperCase();
    }
  },
  methods: {
    search() {
      if (this.license.length == 6) {
        // eslint-disable-next-line
        axios
          .get("https://localhost:44347/api/vehicle/rdw/" + this.license)
          .then(response => {
            this.carInfo = response.data;

            var parts = window.location.href.split("/");
            var licenses = parts[parts.length - 1]
              .split("&")
              .filter(value => value != this.previousLicense);

            if (!licenses.includes(this.license)) {
              licenses.push(this.license);
            }

            router.push({
              name: "kenteken-search",
              params: { licenseParams: licenses.join("&") }
            });

            this.previousLicense = this.license;
          })
          // eslint-disable-next-line
          .catch(error => (this.errorMessage = "Ongeldig kenteken\n" + error));
      }
    },
    stringify(string) {
      return string.split("_").join(" ");
    },
    getKey(data) {
      return data.item[0];
    },
    getValue(data) {
      return data.item[1];
    },
    destroy() {
      var parts = window.location.href.split("/");
      var licenses = parts[parts.length - 1]
        .split("&")
        .filter(value => value != this.license);

      router.push({
        name: "kenteken-search",
        params: { licenseParams: licenses.join("&") }
      });

      // destroy the vue listeners, etc
      this.$destroy();

      // remove the element from the DOM
      this.$el.parentNode.parentNode.removeChild(this.$el.parentNode);
    }
  }
};
</script>

<style scoped>
td {
  width: 50%;
}
</style>

