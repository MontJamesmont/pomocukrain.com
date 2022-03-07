<template>
  <div class="resourcesBoxes grid gap-10 max-w-6xl m-auto justify-around">
    <SummaryBox
      v-for="box in boxes"
      :key="box"
      :mainText="box.mainText"
      :boxTitle="box.boxTitle"
      :leftMainText="box.leftMainText"
      :rightMainText="box.rightMainText"
      :buttonText="box.buttonText"
      :ballast="box.ballast">

      <component v-if="box.customComponent" :is="box.customComponent"></component>
    </SummaryBox>
  </div>

  <!--  -->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SummaryBoxModel } from '@/shared/interfaces/summaryBoxModel.model'
import SummaryBox from '@/shared/components/SummaryBox.vue'

export default defineComponent({
  name: 'TotalResourcesBoxes',
  props: {
    boxes: Array as PropType<Array<SummaryBoxModel>>
  },
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
