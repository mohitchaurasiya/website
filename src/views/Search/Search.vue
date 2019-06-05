<template>
  <v-container fluid>
    <div id="drawer-button__container">
      <v-icon id="drawer-button" @click.stop="toggleDrawer">keyboard_arrow_right</v-icon>
    </div>
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="!isMobile"
      v-model="drawer.open"
      app
      id="drawer"
      width="400"
    >
      <v-list>
        <v-container>
          <SearchForm v-on:search="search" small/>
        </v-container>
      </v-list>
    </v-navigation-drawer>
    <SearchResults v-bind:query="query" :key="query"/>
  </v-container>
</template>

<script>
import SearchResults from "../../components/Search/SearchResults.vue";
import SearchForm from "../../components/Search/Form/SearchForm.vue";

export default {
  name: "vehicle-search",
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
        fixed: false
        // sets if the drawer remains visible all the time (true) or not (false)
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

<style scoped>
#drawer-button {
  position: fixed;
  z-index: 1;
  height: 50px;
  width: 50px;
  left: 0;
  top: 50%;
  margin-top: -25px;
  background-color: rgba(0, 0, 0, 0.6);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: white;
  left: -50px;
}

#drawer-button__container {
  z-index: 1;
  top: 50%;
  left: 0;
  margin-top: -100px;
  height: 200px;
  position: fixed;
  width: 200px;
}

#drawer-button__container:hover #drawer-button {
  left: 0;
}

#drawer::-webkit-scrollbar {
  width: 10px;
}

#drawer::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent;
  background-color: #f1f1f1;
}

#drawer::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px rgba(30, 30, 30, 0.75);
  border: solid 3px transparent;
  border-radius: 10px;
}
</style>

