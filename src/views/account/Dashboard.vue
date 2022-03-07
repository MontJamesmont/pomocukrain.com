<template>
  <PageTitle title="dashboard.title" subtitle="dashboard.subtitle" />
</template>

<script lang="ts">
import { GetUsers } from '@/views/FireStore.vue'
import { defineComponent } from 'vue'
import PageTitle from '@/shared/components/PageTitle.vue'

export default defineComponent({
  components: {
    PageTitle
  },
  inject: {
    getUsers: {
      from: GetUsers
    }
  },
  mounted () {
    (this as any).getUsers()
  }
})
</script>
