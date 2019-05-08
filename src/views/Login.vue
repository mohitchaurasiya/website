<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  prepend-icon="person"
                  v-model="username"
                  label="Gebruikersnaam"
                  type="text"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  v-model="password"
                  label="Wachtwoord"
                  id="password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                to="/"
                color="primary"
                :disabled="!login || !password || password.length < 6"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      const self = this;
      const email = self.email;
      const user = { email, password: self.password };
      self.$store.dispatch("AUTH_REQUEST", user);
    }
  }
};
</script>

<style scoped>
</style>
