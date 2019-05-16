<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-container>
            <v-card-title>
              <h2>Registreren</h2>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid">
                <!--
                    firstname
                    insertion
                    surname
                    birth
                -->
                <v-layout row wrap>
                  <v-flex xs12 md6 pa-2>
                    <v-text-field
                      v-model="user.username"
                      prepend-icon="person"
                      :rules="nameRules"
                      label="Gebruikersnaam"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6 pa-2>
                    <v-text-field
                      v-model="user.email"
                      :rules="emailRules"
                      prepend-icon="email"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4 pa-2>
                    <v-text-field
                      v-model="user.firstname"
                      :rules="nameRules"
                      label="Voornaam"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4 pa-2>
                    <v-text-field
                      v-model="user.insertion"
                      :rules="insertionRules"
                      label="Tussenvoegsel"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4 pa-2>
                    <v-text-field
                      v-model="user.surname"
                      :rules="nameRules"
                      label="Achternaam"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6 pa-2>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="user.birthstring"
                          @focus="menu = true"
                          label="Geboortedatum"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="birthdate"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1900-01-01"
                        locale="nl-NL"
                        required
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 md6 pa-2></v-flex>
                  <v-flex xs12 md6 pa-2>
                    <v-text-field
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      @click:append="show1 = !show1"
                      :type="show1 ? 'text' : 'password'"
                      v-model="user.password"
                      :rules="passwordRules"
                      id="password"
                      label="Wachtwoord"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md5 pa-2>
                    <v-text-field
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      @click:append="show2 = !show2"
                      :type="show2 ? 'text' : 'password'"
                      v-model="user.repeatPassword"
                      :rules="passwordRepeatRules"
                      label="Herhaal wachtwoord"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-flex xs12 md5>
                  <v-checkbox v-model="terms" :label="test" required></v-checkbox>
                </v-flex>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn left color="primary" @click="submit" :disabled="!valid || !terms">
                Register
                <v-icon>done</v-icon>
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      show1: false,
      show2: false,
      test: "Ik ga akkoord met de wortels",
      menu: false,
      terms: false,

      user: {
        username: "",
        firstname: "",
        insertion: "",
        surname: "",
        password: "",
        repeatPassword: "",
        email: "",
        birthstring: ""
      },

      birthdate: "",

      nameRules: [
        v => !!v || "Dit veld is vereist",
        v => v.length <= 30 || "Dit veld moet minder dan 30 tekens bevatten"
      ],
      emailRules: [
        v => !!v || "E-mail is vereist",
        v => /.+@.+/.test(v) || "E-mail moet geldig zijn"
      ],
      insertionRules: [
        v => v.length <= 30 || "Dit veld moet minder dan 30 tekens bevatten"
      ],
      passwordRepeatRules: [
        v =>
          v == this.user.password || "Wachtwoorden zijn niet gelijk aan elkaar"
      ],
      passwordRules: [
        v => !!v || "Wachtwoord is vereist",
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            v
          ) ||
          "Wachtwoord moet minimaal 8 tekens zijn, een kleine letter, hoofdletter, cijfer en speciaal teken bevatten."
      ]
    };
  },
  methods: {
    submit() {
      axios
        .post("https://localhost:44347/api/useraccount/register", this.user)
        .then(response => {
          console.log(response);
          this.$store.commit("authenticate", response.data);
          this.$router.push("/account");
        })
        .catch(error => {
          console.log(error.response.data);
          this.$store.commit("showSnackbar", error.response.data);
        });
    },
    tab(value, length, selector) {
      if (value.length >= length) {
        document.getElementById(selector).focus();
      }
    },
    save(date) {
      this.$refs.menu.save(new Date(date).toLocaleString().split(" ")[0]);
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    birthdate(val) {
      this.user.birthstring = new Date(val).toLocaleString().split(" ")[0];
    }
  }
};
</script>

