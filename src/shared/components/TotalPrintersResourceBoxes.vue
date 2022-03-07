<template>
  <div class="resourcesBoxes grid gap-10 max-w-6xl m-auto justify-around">
    <SummaryBox mainText="12" boxTitle="resources.papers_printed_today" />
    <SummaryBox mainText="4381" boxTitle="resources.papers_printed_in" />
    <SummaryBox mainText="21" boxTitle="resources.papers_printed_this_year" />
    <SummaryBox mainText="4" boxTitle="resources.printers_active_today" />
    <SummaryBox mainText="45" boxTitle="resources.printers_users" />
    <SummaryBox mainText="12" boxTitle="resources.printers_errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SummaryBox from '@/shared/components/SummaryBox.vue'

export default defineComponent({
  name: 'TotalPrintersResourcesBoxes',
  components: {
    SummaryBox
  }
})
</script>

<style lang="scss">
.resourcesBoxes {
  grid-template-columns: repeat(auto-fill, 280px);
}
</style>
