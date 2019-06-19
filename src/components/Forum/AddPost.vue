<template>
  <v-card>
    <v-card-title class="headline" primary-title>Thread toevoegen</v-card-title>

    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 pa-2>
          <v-text-field label="Titel" v-model="title"></v-text-field>
        </v-flex>
        <v-flex xs12 pa-2>
          <v-textarea label="Beschrijving" v-model="body"></v-textarea>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="secundary" @click="hide">Annuleren</v-btn>
      <v-btn color="primary" @click="submit">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import bearer from "../../mixins/bearer.vue";

export default {
  data() {
    return {
      title: null,
      body: null
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

