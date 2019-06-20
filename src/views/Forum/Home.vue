<template>
  <v-container fluid id="container">
    <v-dialog v-model="showDialog">
      <AddThread v-on:hide="showDialog = false" v-on:fetch="fetch"/>
    </v-dialog>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <h2 class="headline">Kentekengespot.nl forum</h2>

            <v-spacer/>
            <v-btn
              color="primary"
              :disabled="!$store.getters.authenticated"
              @click="showDialog = true"
              small
            >
              <v-icon>add</v-icon>&nbsp;Thread
            </v-btn>
          </v-card-title>
          <v-card-text>
            <h3 @click="showSearch = !showSearch" class="clickable">
              Zoeken naar een thread
              <v-icon>{{!showSearch ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon>
            </h3>

            <v-layout row wrap v-show="showSearch">
              <v-flex xs12 md4 pa-2>
                <v-select
                  v-model="make"
                  :items="makes"
                  :placeholder="'Kies een auto'"
                  @change="getModels"
                  clearable
                  @click:clear="clearMake"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 pa-2>
                <v-select
                  class="models"
                  v-model="model"
                  @change="search"
                  clearable
                  v-bind:items="models"
                  @click:clear="search"
                  placeholder="Kies een model"
                  :disabled="models == [] || make == null"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 pa-2>
                <v-text-field v-model="query" @input="search"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <template flat v-for="thread in threads">
            <Thread :thread="thread" :key="thread.forumThreadId"/>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
    <PagingNavigation
      ref="navigation"
      :end-point="`/forum/paging/threads/7/{page}?mk=${make}&md=${model}&query=${query}`"
      page-location="/forum/{page}"
      v-on:updateList="updateList"
    />
  </v-container>
</template>

<script>
import AddThread from "../../components/Forum/AddThread";
import Thread from "../../components/Forum/Thread";
import PagingNavigation from "../../components/PagingNavigation";
import Vue from "vue";

export default {
  components: { AddThread, Thread, PagingNavigation },
  data() {
    return {
      showDialog: false,
      threads: [],
      make: null,
      makes: [],
      model: null,
      models: [],
      query: "",
      showSearch: false
    };
  },
  created() {
    axios
      .get("/vehiclelisting/makes")
      .then(response => {
        this.makes = response.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    getModels(makeId) {
      if (makeId) {
        axios
          .get("/vehiclelisting/models/" + makeId)
          .then(response => {
            this.models = response.data;
            this.search();
          })
          .catch(error => console.log(error));
      }
    },
    clearMake() {
      this.models = [];
      this.model = null;
      this.fetch();
    },
    updateList(list) {
      this.threads = list;
    },
    fetch() {
      Vue.nextTick().then(() => {
        this.$refs.navigation.fetch();
      });
    },
    search() {
      this.$refs.navigation.page = 1;
      this.fetch();
    }
  }
};
</script>

<style scoped>
.navigation * {
  cursor: pointer;
}

#container {
  padding-bottom: calc(56px + 24px);
}

.v-btn--active {
  padding: 8px 12px 10px;
  color: rgba(0, 0, 0, 0.54);
}
</style>
