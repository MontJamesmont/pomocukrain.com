<template>
  <fire-store>
    <router-view />
  </fire-store>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import client from 'axios'
import { changeLocale } from '@/i18n'

import FireStore from '@/views/FireStore.vue'

export default defineComponent({
  name: 'App',
  components: {
    FireStore
  },
  beforeMount () {
    const locale = String(localStorage.getItem('language'))
    if (localStorage.getItem('language')) changeLocale(locale)
    client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (
          error &&
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          this.$store.dispatch('removeToken')
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  }
})
</script>

<style lang="scss">
@import "./styles/fonts.scss";
@import "./styles/main.scss";
</style>
