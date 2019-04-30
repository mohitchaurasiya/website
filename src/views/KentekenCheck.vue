<template>
  <div id="app">
    <v-app>
      <v-card>
        <v-card-title>
          <v-text-field v-model="license"
                        append-icon="search"
                        label="Ken-te-ken"
                        single-line
                        hide-details
                        @input="search"
                        :maxlength="6"
                        style="text-transform:uppercase"
                        type="text"
                        >
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" :value="errorMessage !== ''">{{errorMessage}}</v-alert>
          <div v-if="license && license.length == 6 && errorMessage === ''">
            <h2>Kenteken Algemeen</h2>
            <v-data-table
              hide-headers
              :items="carLicenseGeneral"
              hide-actions
            >
              <template v-slot:items="info">
                <td>{{info.item[0].split('_').join(" ")}}</td>
                <td>{{info.item[1]}}</td>
              </template>
            </v-data-table>
            <h2>Kenteken Brandstof</h2>
            <v-data-table
              hide-headers
              :items="carLicenseFuel"
              hide-actions
            >
              <template v-slot:items="info">
                <td>{{info.item[0].split('_').join(" ")}}</td>
                <td>{{info.item[1]}}</td>
              </template>
            </v-data-table>
          </div>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      data: [],
      carLicenseGeneral: [],
      carLicenseFuel: [],
      license: "15JRVS",
      errorMessage: ""
    }
  },
  mounted() {
    this.search();
  },
  methods:{
    search(){
      this.license = this.license.toUpperCase();
      if(this.license.length == 6){
        axios
          .get('https://localhost:44347/api/vehicle/rdw/' + this.license)
          .then(response => {
            this.carLicenseGeneral = Object.entries(response.data.Kenteken_algemeen);
            this.carLicenseFuel = Object.entries(response.data.Kenteken_brandstof);
            this.errorMessage = "";
          })
          .catch(error => this.errorMessage = "Ongeldig kenteken")
      }
    }
  }
}
</script>

<style scoped>

</style>
