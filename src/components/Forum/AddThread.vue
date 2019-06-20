<template>
  <v-card>
    <v-card-title class="headline" primary-title>Thread toevoegen</v-card-title>

    <v-card-text>
      <v-form v-model="valid">
        <v-layout row wrap>
          <v-flex xs12 pa-2>
            <v-text-field label="Titel" required :rules="shortRules" counter="25" v-model="title"></v-text-field>
          </v-flex>
          <v-flex xs12 pa-2>
            <v-textarea
              label="Beschrijving"
              required
              :rules="longRules"
              counter="250"
              v-model="body"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-select label="Merk" :items="makes" @change="getModels" v-model="make"></v-select>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-select label="Model" :items="models" :disabled="models.length == 0" v-model="model"></v-select>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="secundary" @click="hide">Annuleren</v-btn>
      <v-btn color="primary" @click="submit" :disabled="!valid">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import bearer from "../../mixins/bearer.vue";
import validationRules from "../../mixins/validationRules.vue";

export default {
  data() {
    return {
      makes: [],
      models: [],
      title: null,
      body: null,
      make: null,
      model: null,
      valid: false
    };
  },
  mixins: [bearer, validationRules],
  created() {
    axios
      .get("/vehiclelisting/makes")
      .then(response => {
        this.makes = response.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    hide() {
      this.$emit("hide");
    },
    submit() {
      var newThread = {
        title: this.title,
        body: this.body,
        makeId: this.make,
        makeModelId: this.model
      };

      axios
        .post("/forum/threads/add", newThread, this.getBearer())
        .then(response => {
          this.$emit("hide");
          this.$router.push(`/forum/thread/${response.data}`);
        });
    },
    getModels(makeId) {
      axios
        .get("/vehiclelisting/models/" + makeId)
        .then(response => (this.models = response.data))
        .catch(error => console.log(error));
    }
  }
};
</script>

