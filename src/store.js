import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    snackbar: false,
    snackbarText: ""
  },
  mutations: {
    authenticate(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.setItem("user", null);
    },
    showSnackbar(state, text) {
      state.snackbar = true;
      state.snackbarText = text;
    },
    hideSnackbar(state) {
      state.snackbar = false;
    }
  },
  getters: {
    user: state => state.user,
    authenticated: state => state.user != null,
    snackbarText: state => state.snackbarText,
    token: state => state.user.token
  }
})