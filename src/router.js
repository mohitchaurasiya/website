import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      meta: {
        noAuth: true,
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        noAuth: true,
      },
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/kenteken',
      name: 'kenteken',
      meta: {
        noAuth: true,
      },
      component: () => import( /* webpackChunkName: "kenteken" */ './views/Kenteken.vue')
    },
    {
      path: '/kenteken/:licenseParams',
      name: 'kenteken-search',
      meta: {
        noAuth: true,
      },
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.noAuth)) {
    next();
  } else {
    if (localStorage.getItem("user") != null) {
      next();
    } else {
      next({
        path: '/login',
        params: {
          redirectUrl: to.fullPath
        }
      })
    }
  }
});

export default router;