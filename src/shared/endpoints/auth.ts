import { Method as apiMethod } from 'axios'

export const authEndpoints = {
  me: {
    method: 'get',
    url: '/me'
  },
  login: {
    method: 'post' as apiMethod,
    url: '/oauth2/token'
  },
  logout: {
    method: 'post',
    url: '/logout'
  },
  forgot: {
    method: 'post',
    url: '/forgot'
  },
  reset: {
    method: 'post',
    url: '/reset'
  }
}
