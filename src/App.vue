<template>
  <div id="app">
    <v-app id="inspire" light>
      <v-toolbar
        color="blue darken-4"
        dark
        app
        :fixed="toolbar.fixed"
        :clipped-left="toolbar.clippedLeft"
        :scroll-off-screen="isMobile"
      >
        <v-toolbar-title v-if="!isMobile" id="nav-bar__title">Kentekengespot.nl</v-toolbar-title>
        <v-spacer v-if="!isMobile"/>
        <v-toolbar-items>
          <v-btn flat to="/">Home</v-btn>
          <v-btn flat to="/kenteken">Kenteken check</v-btn>
          <v-btn flat to="/forum">Forum</v-btn>

          <v-menu open-on-hover bottom offset-y v-if="$store.getters.authenticated">
            <template v-slot:activator="{ on }">
              <v-btn min-width="400px" color="primary" v-on="on">{{$store.getters.user.firstname}}</v-btn>
            </template>

            <v-list>
              <v-list-tile to="/account">
                <v-list-tile-title>Account</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/account/advertenties">
                <v-list-tile-title>Mijn Advertenties</v-list-tile-title>
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
        <router-view/>
      </v-content>

      <v-snackbar v-model="$store.state.snackbar" top :timeout="6000">
        {{$store.getters.snackbarText}}
        <v-btn color="red" flat @click="$store.commit('hideSnackbar')">Close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>


<script>
import SearchForm from "./components/Search/Form/SearchForm.vue";
import isMobile from "./mixins/isMobile.vue";

export default {
  data: () => ({
    toolbar: {
      //
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: true
    },
    license: ""
  }),
  mixins: [isMobile],
  methods: {
    search() {
      if (this.license.length == 6) {
        this.$router.push({
          name: "kenteken-search",
          params: { licenseParams: this.license }
        });
        this.$router.go(1);
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
    if (user != null) {
      axios.get("useraccount/valid").then(response => {
        this.$store.commit("authenticate", user);
      });
    }
  }
};
</script>

<style>
.v-content__wrap {
  /* background: url("./images/image_no_license.png") 100% 100% no-repeat; */
  background-color: #e8e8e8;
}

.clickable {
  cursor: pointer;
}

#nav-bar__title {
  padding: 0 16px 0 18px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: #f0b504;
  vertical-align: middle;
  border-color: black;
  color: black;
  position: relative;
}

#nav-bar__title::before {
  content: " ";
  position: absolute;
  left: 0;
  width: 5%;
  height: 100%;
  background-color: #2b4c9c;
  background-image: url(./images/kenteken_eu.png);
  background-size: 80% auto;
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 1400px) {
  .v-content__wrap {
    padding: 0 15% 0 15%;
  }
}

@media (max-width: 960px) {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 0;
  }
  .v-toolbar {
    overflow: auto;
  }
}
</style>
