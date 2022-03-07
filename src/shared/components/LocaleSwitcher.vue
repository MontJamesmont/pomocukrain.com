<template>
  <div class="locale-switcher inline-block text-start" ref="localeswitcher">
    <span class="rounded-md shadow-sm">
      <button class="secondary inline-flex justify-center h-11 w-11 px-2 py-3 text-sm font-bold leading-5 transition duration-150 ease-in-out rounded-md" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
        <span>{{ $i18n.locale.toUpperCase() }}</span>
        <!-- <svg class="w-5 h-5 ms-1 -me-1 stroke-current stroke-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg> -->
      </button>
    </span>
    <div class="opacity-0 invisible locale-switcher-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
      <div class="absolute end-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
        <div class="py-1">
          <a v-for="locale in locales" :key="locale.code" href="javascript:void(0)" @click.prevent="setLocale(locale.code)" :class="(locale.code == $i18n.locale) && 'bg-secondary text-primary font-bold'" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-start hover:bg-secondary hover:text-primary" role="menuitem" >{{ locale.nativeName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { locales, changeLocale } from '@/i18n'

export default defineComponent({
  name: 'LocaleSwitcher',
  data: function () {
    return {
      locales: locales
    }
  },
  methods: {
    setLocale: function (locale: string): void {
      changeLocale(locale)
    }
  }
})
</script>

<style scoped>
  .locale-switcher:focus-within .locale-switcher-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
  }
</style>
