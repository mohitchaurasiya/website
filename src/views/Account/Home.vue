<template>
  <v-container fluid>
    <v-layout>
      <v-flex grow>
        <v-card>
          <v-card-text>
            <h3>Account gegevens</h3>
            {{$store.getters.user.token}}
            <v-layout>
              <v-flex xs6 pa-2>
                <v-text-field
                  label="Email"
                  :rules="emailRules"
                  v-model="newEmail"
                  append-icon="edit"
                  append-outer-icon="check"
                  @click:append-outer="emailDisabled"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 style="text-align:right">
                <h3>Ingelogd als {{$store.getters.user.firstname}} {{$store.getters.user.surname}}</h3>
              </v-flex>
            </v-layout>
            <h3>Wachtwoord</h3>
            <v-layout>
              <v-flex xs12 md4 pa-2>
                <v-text-field label="Oud wachtwoord" v-model="oldPassword"></v-text-field>
              </v-flex>
              <v-flex xs12 md4 pa-2>
                <v-text-field
                  label="Nieuw wachtwoord"
                  :rules="passwordRepeatRules"
                  v-model="newPassword"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4 pa-2>
                <v-text-field
                  label="Herhaal wachtwoord"
                  append-icon="edit"
                  append-outer-icon="check"
                  v-model="newPasswordRepeat"
                  :rules="passwordRepeatRules"
                  @click:append-outer="emailDisabled"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      emailDisabled: true,
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      newEmail: this.$store.getters.user.email,

      emailRules: [
        v => !!v || "E-mail is vereist",
        v => /.+@.+/.test(v) || "E-mail moet geldig zijn"
      ],
      passwordRepeatRules: [
        v => v == this.newPassword || "Wachtwoorden zijn niet gelijk aan elkaar"
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
  }
};
</script>

<style scoped>
</style>
