<template>
  <v-card>
    <v-card-title class="headline" primary-title>Post toevoegen</v-card-title>

    <v-card-text>
      <v-form v-model="valid">
        <v-layout row wrap>
          <v-flex xs12 pa-2>
            <v-text-field label="Titel" required :rules="rules" v-model="title"></v-text-field>
          </v-flex>
          <v-flex xs12 pa-2>
            <v-textarea label="Beschrijving" required :rules="rules" v-model="body"></v-textarea>
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

export default {
  data() {
    return {
      title: null,
      body: null,
      valid: false,

      rules: [v => !!v || "Dit veld is vereist"]
    };
  },
  props: { threadId: Number },
  mixins: [bearer],
  methods: {
    hide() {
      this.$emit("hide");
    },
    submit() {
      var newPost = {
        title: this.title,
        body: this.body
      };

      axios
        .post(
          `/forum/threads/${this.threadId}/posts/add`,
          newPost,
          this.getBearer()
        )
        .then(response => {
          this.$emit("hide");
          this.$emit("fetch");
        });
    }
  }
};
</script>

