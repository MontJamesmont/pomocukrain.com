import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routesAccount from '@/views/account/router'
import routesAuth from '@/views/auth/router'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Account',
    component: () => import('../views/account/Account.vue'),
    children: routesAccount /* ,
    beforeEnter: function (to, from, next) {
      if (store.getters.isAuthenticated) next()
      else next({ path: '/auth', query: { redirect: to.path } })
    } */
  }, {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/Auth.vue'),
    children: routesAuth,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) next()
      else next({ path: from.path })
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
