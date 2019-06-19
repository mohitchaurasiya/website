<template>
  <router-link class="thread clickable" tag="div" :to="`/forum/thread/${thread.forumThreadId}`">
    <v-card-title>
      <v-layout wrap row>
        <v-flex xs6 class="headline">{{thread.forumThreadId}} {{thread.title}}</v-flex>
        <v-flex xs6 style="text-align: right;">{{postCount}} berichten</v-flex>
        <v-flex
          xs12
          class="grey--text"
        >{{thread.make != null ? thread.make.name : ''}} {{thread.makeModel != null ? thread.makeModel.name : ''}}</v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>{{thread.body}}</v-card-text>
  </router-link>
</template>

<script>
export default {
  props: { thread: Object },
  data() {
    return {
      postCount: 0
    };
  },
  created() {
    axios
      .get(`/forum/threads/${this.thread.forumThreadId}/count`)
      .then(response => (this.postCount = response.data))
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.thread {
  padding: 5px 10px 5px 10px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-radius: 2px;
  transition: all 0.4s;
  margin-bottom: 0px;
}

.thread:hover {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
</style>
