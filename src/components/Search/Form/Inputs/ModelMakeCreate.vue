<template>
  <div>
    <div>
      <v-flex xs12 md12 pa-2>
        {{item.header}}
        <span style="color:red;">*</span>
        <v-select
          v-model="make"
          :items="item.options"
          :placeholder="'Kies een ' + item.header.toLowerCase()"
          required
          :rules="rules"
          @input="submit"
          @change="getModels"
          clearable
          @click:clear="clearModels"
        ></v-select>
      </v-flex>
      <v-flex xs12 md12 pa-2>
        Model
        <span style="color: red;">*</span>
        <v-select
          class="models"
          v-model="model"
          @input="submit"
          clearable
          required
          :rules="rules"
          v-bind:items="models != null ? models : []"
          placeholder="Kies een model"
          :disabled="models == null || make == null"
        ></v-select>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  name: "model-make-create",
  props: { item: Object },
  data() {
    return {
      models: null,
      make: null,
      model: null,
      rules: [v => !!v || "Dit veld is vereist"]
    };
  },
  methods: {
    getModels(value) {
      this.model = null;
      this.submit();
      if (value) {
        axios
          .get("/vehiclelisting/models/" + value)
          .then(response => {
            this.models = response.data;
          })
          .catch(error => console.log(error.response.data));
      }
    },
    submit() {
      this.$emit("submit", this.make, this.model);
    },
    clearModels() {
      this.model = null;
    }
  }
};
</script>

<style scoped>
</style>
