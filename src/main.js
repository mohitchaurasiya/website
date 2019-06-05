import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.axios.defaults.baseURL = "https://localhost:44347/api/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')