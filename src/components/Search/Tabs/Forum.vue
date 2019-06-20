<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Forum threads</h3>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex
          xs12
          md6
          v-for="thread in result"
          :key="thread.uri"
          class="clickable wrapper__thread"
          @click="navigate(thread.uri)"
        >
          <b>{{thread.title}}</b>
          <br>
          {{thread.body}}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["vehicle"],
  data() {
    return {
      result: null
    };
  },
  methods: {
    navigate(url) {
      this.$router.push(url);
    }
  },
  mounted() {
    axios
      .get(`/forum/threads/car/${this.vehicle.makeId}/${this.vehicle.modelId}/`)
      .then(response => {
        this.result = response.data;
      });
  }
};
</script>

<style scoped>
.wrapper__thread {
  padding: 5px 10px 5px 10px;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 10px;
  transition: all 0.4s;
}

.wrapper__thread:hover {
  border: 1px solid grey;
}
</style>

