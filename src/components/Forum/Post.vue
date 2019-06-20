<template>
  <div class="post">
    <v-card-title>
      <v-layout wrap row>
        <v-flex xs6 class="headline">{{post.forumPostId}} {{post.title}}</v-flex>
        <v-flex xs6 style="text-align: right;">
          {{post.creation}}
          <v-icon v-if="currentUser" @click="deletePost">delete</v-icon>
        </v-flex>
        <v-flex xs12 class="grey--text">{{post.userAccount.username}}</v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>{{post.body}}</v-card-text>
  </div>
</template>

<script>
import bearer from "../../mixins/bearer.vue";
export default {
  props: { post: Object },
  mixins: [bearer],
  data() {
    return {};
  },
  methods: {
    currentUser() {
      return (
        this.$store.getters.user != null &&
        post.userAccount.userAccountId == this.$store.getters.user.userAccountId
      );
    },
    deletePost() {
      axios
        .delete(
          `forum/threads/${this.post.forumThreadId}/posts/${
            this.post.forumPostId
          }/delete`,
          this.getBearer()
        )
        .then(() => {
          // destroy the vue listeners, etc
          this.$destroy();

          // remove the element from the DOM
          this.$el.parentNode.removeChild(this.$el);
        });
    }
  }
};
</script>

<style scoped>
.post {
  padding: 5px 10px 5px 10px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 0;
  transition: all 0.4s;
}

.post:hover {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
</style>
