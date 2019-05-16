<template>
  <div id="app">
    <v-app id="inspire" light>
      <v-navigation-drawer
        :clipped="drawer.clipped"
        :fixed="drawer.fixed"
        :permanent="drawer.permanent"
        :mini-variant="drawer.mini"
        v-model="drawer.open"
        app
      >
        <v-list>
          <br>
          <v-list-tile>
            <v-text-field
              label="Kenteken zoeken"
              append-outer-icon="search"
              v-model="license"
              @click:append-outer="search"
              :maxlength="6"
            ></v-text-field>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :fixed="toolbar.fixed"
        :clipped-left="toolbar.clippedLeft"
      >
        <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>Kentekengespot.nl</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn flat to="/">Home</v-btn>
          <v-btn flat to="/kenteken">Kenteken check</v-btn>

          <v-menu open-on-hover bottom offset-y v-if="$store.getters.authenticated">
            <template v-slot:activator="{ on }">
              <v-btn min-width="400px" color="primary" v-on="on">{{$store.getters.user.firstname}}</v-btn>
            </template>

            <v-list>
              <v-list-tile to="/account">
                <v-list-tile-title>Account</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/account/autoverkopen">
                <v-list-tile-title>Auto verkopen</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout">
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-btn v-if="!$store.getters.authenticated" flat to="/account/login">Login</v-btn>
          <v-btn v-if="!$store.getters.authenticated" flat to="/account/register">Register</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <router-view :key="$route.fullPath"/>
      </v-content>
      <v-snackbar v-model="$store.state.snackbar" top :timeout="6000">
        {{$store.getters.snackbarText}}
        <v-btn color="red" flat @click="$store.commit('hideSnackbar')">Close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>


<script>
export default {
  data: () => ({
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
    },
    toolbar: {
      //
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: true
    },
    license: ""
  }),
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
    search() {
      if (this.license.length == 6) {
        this.$router.push({
          name: "kenteken-search",
          params: { licenseParams: this.license }
        });
        this.$router.go(1);
        this.toggleDrawer();
      }
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/account/login");
    }
  },
  watch: {
    license: function(val) {
      this.license = val.toUpperCase();
    }
  },
  created() {
    var user = JSON.parse(localStorage.getItem("user"));
    // if jwt correct blabla
    if (user != null) {
      this.$store.commit("authenticate", user);
    }
  }
};
</script>

