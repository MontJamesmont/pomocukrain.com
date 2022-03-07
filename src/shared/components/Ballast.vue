<template>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 text-xs flex rounded-sg bg-secondary mb-2">
      <div v-show="greenVisible"
        :style="{ width: greenPercentage + '%' }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-successColor"
        :class="roundGreen"
      ></div>
      <div v-show="orangeVisible"
        :style="{ width: orangePercentage + '%' }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-warningColor"
        :class="roundOrange"
      ></div>
      <div v-show="redVisible"
        :style="{ width: redPercentage + '%' }"
        class="shadow-none flex flex-col text-center rounded-e-lg whitespace-nowrap text-white justify-center bg-errorColor"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    greenPercentage: {
      type: Number,
      required: false,
      default: 0
    },
    orangePercentage: {
      type: Number,
      required: false,
      default: 0
    },
    redPercentage: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    greenVisible () : boolean {
      return this.greenPercentage > 0
    },
    orangeVisible () : boolean {
      return this.orangePercentage! > 0
    },
    redVisible () : boolean {
      return this.redPercentage! > 0
    },
    roundGreen () : string {
      return this.orangeVisible || this.redVisible ? '' : 'rounded-e-lg'
    },
    roundOrange () : string {
      return this.redVisible ? '' : 'rounded-e-lg'
    }
  }
})
</script>
