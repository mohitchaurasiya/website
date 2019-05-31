import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/kenteken',
      name: 'license',
      component: () => import( /* webpackChunkName: "kenteken" */ './views/License.vue')
    },
    {
      path: '/kenteken/:licenseParams',
      name: 'license-search',
      component: () => import( /* webpackChunkName: "kenteken-search" */ './views/License.vue')
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Account/Login.vue')
    },
    {
      path: '/account/register',
      name: 'register',
      meta: {
        noAuth: true,
      },
      component: () => import( /* webpackChunkName: "register" */ './views/Account/Register.vue')
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "account" */ './views/Account/Home.vue')
    },
    {
      path: '/account/verkopen',
      name: 'vehicle-sales',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/VehicleSales.vue')
    },
    {
      path: '/zoeken/voertuig/:id',
      name: 'vehicle-details',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Search/VehicleDetails.vue')
    },
    {
      path: '/zoeken/voertuig/:id/*',
      name: 'vehicle-details/info',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Search/VehicleDetails.vue')
    },
    {
      path: '/zoeken',
      name: 'search',
      component: () => import( /* webpackChunkName: "search" */ './views/Search/Search.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.auth)) {
    next();
  } else {
    if (localStorage.getItem("user") != null) {
      next();
    } else {
      next({
        path: '/account/login',
        params: {
          redirectUrl: to.fullPath
        }
      })
    }
  }
});

export default router;