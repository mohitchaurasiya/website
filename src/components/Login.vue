<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-title color="white">Login</v-card-title>
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
      var credentials = { username: this.username, password: this.password };
      axios
        .post("/useraccount/authenticate", credentials)
        .then(response => {
          this.$store.commit("authenticate", response.data);
          this.$router.push(this.redirectUrl);
        })
        .catch(error => {
          this.$store.commit("showSnackbar", error.response.data);
        });
    }
  }
};
</script>

<style scoped>
#submitButton {
  display: none;
}

.v-card__title {
  background-color: #3773d0;
  color: white;
}
</style>
