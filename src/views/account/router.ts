import { RouteRecordRaw } from 'vue-router'

const routesAccount: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Dashboard',
    component: () => import('./Dashboard.vue')
  }
]

export default routesAccount
