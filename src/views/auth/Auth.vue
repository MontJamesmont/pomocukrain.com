<template>
  <div class="auth">
    <LocaleSwitcher class="absolute end-4 top-4 z-50"></LocaleSwitcher>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'

export default defineComponent({
  name: 'Auth',
  components: {
    LocaleSwitcher
  }
})
</script>
