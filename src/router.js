import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/kenteken',
      name: 'kenteken',
      component: () => import( /* webpackChunkName: "kenteken" */ './views/Kenteken.vue')
    },
    {
      path: '/kenteken/:licenseParams',
      name: 'kenteken-search',
      component: () => import( /* webpackChunkName: "kenteken-search" */ './views/Kenteken.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import( /* webpackChunkName: "account" */ './views/Account.vue')
    },
    {
      path: '/autoverkopen',
      name: 'auto-verkopen',
      component: () => import( /* webpackChunkName: "account" */ './views/AutoVerkopen.vue')
    }
  ]
})