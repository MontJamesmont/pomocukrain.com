import { RouteRecordRaw } from 'vue-router'

const routesAuth: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Login',
    component: () => import('./Login.vue')
  }, {
    path: 'signup',
    name: 'Register',
    component: () => import('./Register.vue')
  }, {
    path: 'verify',
    name: 'Pin Verification',
    component: () => import('./PinVerification.vue')
  }, {
    path: 'create',
    name: 'Create Account',
    component: () => import('./CreateAccount.vue')
  }
]

export default routesAuth
