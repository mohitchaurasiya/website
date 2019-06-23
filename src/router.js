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
      path: '/account/advertenties',
      name: 'listings',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/Listings.vue')
    },
    {
      path: '/account/threads',
      name: 'account-hreadds',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/Threads.vue')
    },
    {
      path: '/account/threads/:page',
      name: 'account-page-threads',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/Threads.vue')
    },
    {
      path: '/account/advertenties/page/:page',
      name: 'listings-page',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/Listings.vue')
    },
    {
      path: '/account/advertenties/nieuw',
      name: 'new-listing',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/NewListing.vue')
    },
    {
      path: '/account/advertenties/aanpassen/:id',
      name: 'edit-listing',
      meta: {
        auth: true,
      },
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Account/EditListing.vue')
    },
    {
      path: '/zoeken/voertuig/:id',
      name: 'vehicle-details',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Search/VehicleDetails.vue')
    },
    {
      path: '/forum/thread/:id',
      name: 'forum-thread',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Forum/Thread.vue')
    },
    {
      path: '/forum/thread/:id/:page',
      name: 'forum-thread-page',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Forum/Thread.vue')
    },
    {
      path: '/zoeken/voertuig/:id/*',
      name: 'vehicle-details/info',
      component: () => import( /* webpackChunkName: "auto-verkopen" */ './views/Search/VehicleDetails.vue')
    },
    {
      path: '/zoeken',
      name: 'search',
      component: () => import( /* webpackChunkName: "search" */ './views/Search/VehicleOverview.vue')
    },
    {
      path: '/zoeken/:page',
      name: 'search-page',
      component: () => import( /* webpackChunkName: "search" */ './views/Search/VehicleOverview.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import( /* webpackChunkName: "search" */ './views/Forum/Home.vue')
    },
    {
      path: '/forum/:page',
      name: 'forum-page',
      component: () => import( /* webpackChunkName: "search" */ './views/Forum/Home.vue')
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