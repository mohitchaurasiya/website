<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
      >
        <v-list>
          <br/>
          <v-list-tile>
              <v-text-field
                label="Kenteken zoeken"
                prepend-icon="search"
              ></v-text-field>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-toolbar
          app
          :fixed="toolbar.fixed"
          :clipped-left="toolbar.clippedLeft"
        >
          <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
          <v-toolbar-title>Kentekengespot.nl</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn flat to="/">
                Home
            </v-btn>
            <v-btn flat to="/kenteken">
                Kenteken check
            </v-btn>
            <v-btn flat to="/login">
                Login
            </v-btn>    
          </v-toolbar-items>
        </v-toolbar>
        <router-view />
        <v-footer clipped class="pa-3">
          <v-spacer />
          <div>Rendall Schijven & Lars Schipper &copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
      </v-content>
    </v-app>
  </div>
</template>


<script>
export default ({
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
    }
  }),
  methods: {
    toggleDrawer () {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true
        this.toolbar.clippedLeft = true
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open
      }
    }
  }
})
</script>

