import { createStore } from 'vuex'
import client from 'axios'
import qs from 'qs'
import { VueCookieNext } from 'vue-cookie-next'
import { apiBase, apiEndpoints } from '@/shared/endpoints/api'
import { User, loggedUserMock } from '@/shared/interfaces/user.model'
import router from '../router'

client.defaults.baseURL = apiBase
client.interceptors.request.use(function (config) {
  const token = VueCookieNext.getCookie('token')
  if (token && token.length > 0) {
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + token
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default createStore({
  state: {
    lang: '' as string,
    loggedUser: {} as User
  },
  mutations: {
    setLang: (state, newLang) => { state.lang = newLang },
    setLoggedUser: (state, loggedUser: User) => { state.loggedUser = loggedUser }
  },
  getters: {
    isAuthenticated: () => !!VueCookieNext.getCookie('token')
  },
  actions: {
    setToken: (context, token: string) => {
      // VueCookieNext.setCookie('token', token, { path: '/', domain: 'dashboard.creativeadvtech.ml' })
      // VueCookieNext.setCookie('token', token, { path: '/', domain: 'localhost' })
      VueCookieNext.setCookie('token', token, { path: '/', domain: location.hostname })
      context.commit('login', token)
      context.dispatch('getLoggedUser')
    },
    removeToken: (context) => {
      VueCookieNext.removeCookie('dashboard_token', { path: '/', domain: location.hostname })
      context.commit('logout')
      context.commit('setLoggedUser', null)
      router.push('/auth')
    },
    login: async (context, { email, password, remember }) => {
      const data = {
        grant_type: 'password',
        username: email,
        password: password
      }
      await client({
        method: apiEndpoints.login.method,
        url: apiEndpoints.login.url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      }).then(resp => {
        const token = resp.data.access_token
        context.dispatch('setToken', token)
      }).catch(err => {
        context.dispatch('removeToken')
        console.log(err)
        // REMOVE: just for development
        if (email !== 'admin' || password !== 'admin') throw err
        else {
          context.dispatch('setToken', 'hashhashtoken')
        }
        // throw err
      })
    },
    logout: async (context) => {
      await client.post(apiEndpoints.logout.url, { body: { userId: context.state.loggedUser.id } }).then(() => {
        context.dispatch('removeToken')
      }).catch(() => {
        // TO DO: remove these lines after integrate with backend, they are for mock
        context.dispatch('removeToken')
      })
    },
    getLoggedUser: async (context, token) => {
      await client.get(apiEndpoints.me.url).then(response => {
        context.commit('setLoggedUser', response.data)
      }, () => {
        context.commit('setLoggedUser', loggedUserMock)
      })
    }
  },
  modules: {
  }
})
