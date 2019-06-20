<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap justify-space-between>
        <v-flex xs12 md5>
          <h3 class="headline">Merk Forum threads</h3>
          <div
            v-for="thread in makeResult"
            :key="thread.uri"
            class="clickable wrapper__thread"
            @click="navigate(thread.uri)"
          >
            <b>{{thread.title}}</b>
            <br>
            {{thread.body}}
          </div>
        </v-flex>
        <v-flex xs12 md5>
          <h3 class="headline">Model Forum threads</h3>
          <div
            v-for="thread in modelResult"
            :key="thread.uri"
            class="clickable wrapper__thread"
            @click="navigate(thread.uri)"
          >
            <b>{{thread.title}}</b>
            <br>
            {{thread.body}}
          </div>
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
      makeResult: null,
      modelResult: null
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
        this.modelResult = response.data;
      });
    axios.get(`/forum/threads/car/${this.vehicle.makeId}/`).then(response => {
      this.makeResult = response.data;
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

