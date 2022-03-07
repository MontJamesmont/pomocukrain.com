import { createApp } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

createApp(App).use(store).use(router).use(VueCookieNext).use(i18n).mount('#app')
