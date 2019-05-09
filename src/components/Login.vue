<template>
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
              <input type="submit" id="submitButton" :disabled="!login || !password">
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!login || !password || password.length < 6"
              @click="login"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  props: ["redirectUrl"],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      var user = { name: this.username };
      if (this.password == "123123") {
        user.admin = user.name == "dwarfexop";
        console.log(user);
        this.$store.commit("authenticate", user);
        this.$router.push(this.redirectUrl);
      } else {
        this.$store.commit("showSnackbar", "Wrong password");
      }
    }
  }
};
</script>

<style scoped>
#submitButton {
  display: none;
}
</style>
