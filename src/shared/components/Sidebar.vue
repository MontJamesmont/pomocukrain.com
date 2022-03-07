<template>
  <div class="h-full border-borderColor border-e z-10">
      <div v-if="companyTitle" class="flex items-center justify-center whitespace-nowrap">
        <div class="rounded text-white text-lg m-2" style="background-color: #6FCF97">
          <span class="company-short-title py-2 px-1">{{ $t(companyShortTitle) }}</span>
        </div>
        <router-link to="/workspace" class="text-lg text-primary font-bold overflow-ellipsis overflow-hidden whitespace-nowrap sidebar-company-title">{{ $t(companyTitle) }}</router-link>
      </div>
      <nav class="flex justify-between text-textColor mt-9">
        <ul class="w-60 mx-6">
          <li
            v-for="(navItem, index) in navItems"
            :key="index"
          >
          <router-link :to="navItem.routeTo" class="flex flex-wrap items-center p-2 hover:bg-secondary hover:text-primary rounded sidebar-nav-link">
              <BaseIcon :name="navItem.iconName" class="me-2" />
            {{ $t(navItem.routeText) }}
          </router-link>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseIcon from '@/shared/components/base-icon/BaseIcon.vue'
import { NavigationItem } from '@/shared/interfaces/navigation.model'

export default defineComponent({
  components: {
    BaseIcon
  },
  props: {
    companyTitle: {
      type: String,
      required: true
    },
    navItems: {
      type: Object as PropType<NavigationItem[]>,
      required: true
    }
  },
  computed: {
    companyShortTitle () : string {
      const matches = this.companyTitle.match(/\b(\w)/g)
      const shortTitle = matches?.slice(0, 3).join('') || 'CAT'
      return shortTitle
    }
  }
})
</script>

<style lang="scss" scoped>

.sidebar {
  &-company-title {
    max-width: 198px;
  }
  &-nav-link {
    padding: 10px;
    &.router-link-exact-active {
      @apply bg-secondary;
      @apply text-primary;
      @apply font-bold;
    }
  }
}
</style>
