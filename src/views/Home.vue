<template>
  <v-container fluid>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-text>
            <SearchForm/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SearchForm from "../components/Search/Form/SearchForm.vue";

export default {
  components: {
    SearchForm
  }
};
</script>

<style scoped>
</style>
