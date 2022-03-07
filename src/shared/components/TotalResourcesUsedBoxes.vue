<template>
  <div class="resourcesBoxes grid gap-10 max-w-6xl m-auto justify-around">
    <SummaryBox
      mainText="12"
      boxTitle= "resources.connected_devices"
    />
    <SummaryBox
      mainText="12"
      boxTitle= "resources.active_connections"
    />
    <SummaryBox
      mainText="21"
      boxTitle= "resources.active_users"
    />
    <SummaryBox
      leftMainText="%"
      mainText="15"
      boxTitle= "resources.cpu_load"
      :ballast="[15]"
    />
    <SummaryBox
      leftMainText="%"
      mainText="45"
      boxTitle= "resources.ram_load"
      :ballast="[40, 5]"
    />
    <SummaryBox
      leftMainText="TB"
      mainText="12"
      rightMainText="/320"
      boxTitle= "resources.free_disk_space"
      :ballast="[12]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SummaryBox from '@/shared/components/SummaryBox.vue'

export default defineComponent({
  name: 'TotalResourcesUsedBoxes',
  components: {
    SummaryBox
  }
})
</script>

<style lang="scss">
  .resourcesBoxes {
    grid-template-columns: repeat(auto-fill, 280px)
  }
</style>
