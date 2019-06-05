<template>
  <v-card>
    <v-container>
      <v-card-title>
        <h2>Opties</h2>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          @input="filter"
          label="Zoeken"
          type="text"
        ></v-text-field>
      </v-card-title>
      <v-layout wrap>
        <div v-bind:key="option.name" v-for="option in filteredOptions" class="option-checkbox">
          <v-checkbox :name="option.name" :label="stringify(option.text)"></v-checkbox>
        </div>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "carsalesoptions",
  data() {
    return {
      options: [],
      filteredOptions: [],
      search: ""
    };
  },
  beforeCreate() {
    axios
      .get("/vehiclesearch/characteristics/options")
      .then(response => {
        this.options = response.data.opties;
        this.filteredOptions = this.options;
      })
      .catch(error => console.log(error));
  },
  methods: {
    stringify(string) {
      return string.split("_").join(" ");
    },
    filter() {
      this.filteredOptions = this.options.filter(option =>
        option.text.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.option-checkbox {
  width: calc(100% / 3);
  word-break: break-all;
}
@media (max-width: 1279px) {
  .option-checkbox {
    width: calc(100% / 2);
  }
}
</style>


