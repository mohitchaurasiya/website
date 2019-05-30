<template>
  <v-container fluid>
    <v-toolbar-side-icon v-if="isMobile" @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      v-if="isMobile"
      app
      width="400"
    >
      <v-list>
        <v-list-tile></v-list-tile>
        <v-spacer/>
      </v-list>
    </v-navigation-drawer>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-text>
            <v-layout>
              <v-flex md4 v-if="!isMobile">
                <SearchForm v-on:search="search" small/>
              </v-flex>
              <v-flex md8 grow>
                <SearchResults v-bind:query="query" :key="$route.fullPath"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SearchResults from "../../components/CarSearch/SearchResults.vue";
import SearchForm from "../../components/CarSearch/SearchForm.vue";

export default {
  name: "car-search",
  components: {
    SearchResults,
    SearchForm
  },
  data() {
    return {
      query: "",
      isMobile: true,
      minMobileWidth: 960,
      drawer: {
        // sets the open status of the drawer
        open: false,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: false,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: false
      }
    };
  },
  methods: {
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    },
    search(query) {
      this.query = query;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth < this.minMobileWidth;
    });
    this.isMobile = window.innerWidth < this.minMobileWidth;
  }
};
</script>
