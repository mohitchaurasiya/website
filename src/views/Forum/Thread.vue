<template>
  <v-container v-if="thread" fluid>
    <v-dialog v-model="showDialog">
      <AddPost v-on:hide="showDialog = false" :threadId="thread.forumThreadId" v-on:fetch="fetch"/>
    </v-dialog>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title class="headline">
            <v-icon @click="$router.go(-1)">keyboard_arrow_left</v-icon>
            {{thread.title}}
          </v-card-title>
          <template flat v-for="post in posts">
            <Post :post="post" :key="post.forumPostId"/>
          </template>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              :disabled="!$store.getters.authenticated"
              @click="showDialog = true"
            >
              <v-icon>add</v-icon>&nbsp;comment
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddPost from "../../components/Forum/AddPost";
import Post from "../../components/Forum/Post";

export default {
  data() {
    return {
      thread: null,
      posts: [],
      showDialog: false
    };
  },
  components: { AddPost, Post },
  created() {
    axios.get("/forum/threads/" + this.$route.params.id).then(response => {
      this.thread = response.data;
      this.posts = this.thread.forumPosts;
    });
  },
  methods: {
    fetch() {
      axios.get("/forum/threads/" + this.$route.params.id).then(response => {
        this.posts = response.data.forumPosts;
      });
    }
  }
};
</script>
