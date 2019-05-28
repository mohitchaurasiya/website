<template>
  <v-container fluid>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-container>
            <h2>hello, and welcome to the big dick club</h2>
            <v-layout row>
              <v-flex xs0 md4>
                <SearchForm v-on:search="search" small/>
              </v-flex>
              <v-flex xs12 md8>
                <SearchResults v-bind:query="query" :key="$route.fullPath"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SearchResults from "../components/CarSearch/SearchResults.vue";
import SearchForm from "../components/CarSearch/SearchForm.vue";

export default {
  name: "car-search",
  components: {
    SearchResults,
    SearchForm
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    search(query) {
      this.query = query;
    }
  }
};
</script>
