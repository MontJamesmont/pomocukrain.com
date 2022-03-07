<template>
  <div class="account pt-17">
    <div class="header flex items-center bg-backgroundColor h-17 border-b border-borderColor fixed top-0 w-full py-3.5 ps-7.5 pe-4 z-10">
      <div class="logo h-full flex items-center me-38">
        <img class="h-full me-2.5" src="@/assets/logo.png" alt="">
        <div class="text-textColor text-lg">Creative</div>
      </div>
      <div class="rightIcons h-full flex items-center ms-auto">
        <LocaleSwitcher class="me-6"></LocaleSwitcher>
        <button class="secondary p-0 w-11 h-11" @click="logout">
          <LogoutIcon class="text-primary"></LogoutIcon>
        </button>
      </div>
    </div>
    <div class="main flex">
      <div class="main-sidebar h-full fixed start-0 bg-backgroundColor z-10">
        <Sidebar :navItems="navItems" companyTitle="" />
      </div>
      <div class="main-container content w-full py-5 px-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/shared/components/Sidebar.vue'
import { NavigationItem } from '@/shared/interfaces/navigation.model'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'
import LogoutIcon from '@/shared/components/base-icon/icons/LogoutIcon.vue'

export default defineComponent({
  name: 'Account',
  components: {
    Sidebar,
    LocaleSwitcher,
    LogoutIcon
  },
  data: function () {
    return {
      navItems: [
        {
          iconName: 'dashboard',
          routeTo: '/',
          routeText: 'nav.dashboard'
        }
      ] as NavigationItem[]
    }
  },
  methods: {
    logout: function (): void {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/auth')
      })
    }
  }
})
</script>

<style lang="scss">
  $sidebar-width : 290px;

  .main {
    padding-left: $sidebar-width;
    &-sidebar {
      width: $sidebar-width;
    }
  }
</style>
