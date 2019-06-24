<template>
  <v-container v-if="thread" fluid id="container">
    <v-dialog v-model="showDialog">
      <AddPost v-on:hide="showDialog = false" :threadId="thread.forumThreadId" v-on:fetch="fetch"/>
    </v-dialog>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <v-layout wrap row>
              <v-icon @click="$router.go(-1)">keyboard_arrow_left</v-icon>
              <v-flex xs6 class="headline">{{thread.title}}</v-flex>
              <v-flex xs6 style="text-align: right;">
                {{thread.creation}}
                <v-icon v-if="currentUser" @click="deletePost">delete</v-icon>
              </v-flex>
              <v-flex xs12 class="grey--text">{{thread.userAccount.username}}</v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>{{thread.body}}</v-card-text>
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
    <PagingNavigation
      ref="navigation"
      :end-point="`/forum/paging/threads/${this.$route.params.id}/posts/7/{page}`"
      :page-location="`/forum/thread/${this.$route.params.id}/{page}`"
      v-on:updateList="updateList"
    />
  </v-container>
</template>
<script>
//"paging/threads/{id}/posts/{amount}/{page}"
import AddPost from "../../components/Forum/AddPost";
import Post from "../../components/Forum/Post";
import PagingNavigation from "../../components/PagingNavigation";

export default {
  data() {
    return {
      thread: null,
      posts: [],
      showDialog: false
    };
  },
  components: { AddPost, Post, PagingNavigation },
  created() {
    axios.get("/forum/threads/" + this.$route.params.id).then(response => {
      this.thread = response.data;
      console.log(response.data);
    });
  },
  methods: {
    fetch() {
      this.$refs.navigation.page = 1;
      axios
        .get(`/forum/paging/threads/${this.$route.params.id}/posts/7/1`)
        .then(response => {
          this.posts = response.data.list;
        });
    },
    updateList(list) {
      this.posts = list;
    }
  }
};
</script>

<style scoped>
#container {
  padding-bottom: calc(56px + 24px);
}
</style>
