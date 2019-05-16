<template>
  <v-container fluid>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-container>
            <v-card-title>
              <h2>Auto zoeken</h2>
            </v-card-title>
            <v-card-text>
              <v-form id="form">
                <v-layout row wrap>
                  <v-flex xs12 md6 pa-2 v-if="makes">
                    {{makes.header}}
                    <v-select
                      :items="makes.values"
                      :placeholder="'Kies een ' + makes.header.toLowerCase()"
                      @change="getModels"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6 pa-2>
                    Model
                    <v-select
                      :items="models"
                      v-bind:placeholder=" models.length == 0 ? '' : 'Kies een model'"
                      :disabled="models.length == 0"
                    ></v-select>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                    pa-2
                    v-bind:key="searchOption.header"
                    v-for="searchOption in searchOptions"
                    v-model="searchOption.type"
                  >
                    {{stringify(searchOption.header)}}
                    <v-select
                      :items="searchOption.values"
                      :placeholder="'Kies een ' + stringify(searchOption.header.toLowerCase())"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6 pa-2>
                    <v-text-field label="Postcode" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-spacer/>
                  <v-btn @click="submit">
                    Search
                    &nbsp;
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchOptions: [],
      makeSearch: "",
      models: [],
      makes: {
        header: "",
        values: [
          {
            text: "",
            value: ""
          }
        ]
      }
    };
  },
  mounted() {
    axios
      .get("https://localhost:44347/api/vehiclesearch/options/limited")
      .then(response => {
        this.searchOptions = response.data.searchOptions;
        this.makes = response.data.makes;
      })
      .catch(error => console.log(error.response.data));
  },
  methods: {
    stringify(string) {
      return string ? string.split("_").join(" ") : "";
    },
    getModels(value) {
      axios
        .get("https://localhost:44347/api/vehiclesearch/models/" + value)
        .then(response => {
          this.models = response.data;
        })
        .catch(error => console.log(error.response.data));
    },
    submit() {}
  }
};
</script>

<style scoped>
</style>
