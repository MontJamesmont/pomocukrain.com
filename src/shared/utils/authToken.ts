import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '@/store/index'

export const redirectIfTokenExists = (to : RouteLocationNormalized, from : RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (isAuthenticated) next()
  else next({ path: 'auth', query: { redirect: to.path } })
}

export const redirectIfTokenExpired = (to : RouteLocationNormalized, from : RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (!isAuthenticated) next()
  else next({ path: from.path })
}
