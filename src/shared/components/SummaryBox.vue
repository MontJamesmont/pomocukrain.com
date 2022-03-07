<template>
  <div class="flex border-borderColor border-2 rounded summary-box">
    <div class="flex items-center justify-center flex-col w-full">
      <div class="w-full text-center">
        <span v-if="leftMainText" class="text-textHeaderColor text-base font-semibold"> {{ $t(leftMainText) }}</span>
        <span v-if="mainText" class="text-primary font-bold text-6xl">{{ $t(mainText) }}</span>
        <span v-if="rightMainText" class="text-textHeaderColor text-base font-semibold">{{ $t(rightMainText) }}</span>
      </div>
      <div v-if="boxTitle" class="text-textColor font-bold w-full p-2">{{ $t(boxTitle) }}</div>
      <div v-if="showBallast" class="summary-box-ballast">
        <Ballast :greenPercentage="greenPercentage" :orangePercentage="orangePercentage" :redPercentage="redPercentage" />
      </div>
      <div v-if="showButton" class="summary-box-button w-27 rounded">
        <button class="bg-primary text-white m-auto" @click="handleClick">{{ $t(buttonText) }}</button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import Ballast from '@/shared/components/Ballast.vue'

export default defineComponent({
  name: 'SummaryBox',
  components: {
    Ballast
  },
  props: {
    leftMainText: String,
    mainText: String,
    rightMainText: String,
    boxTitle: String,
    buttonText: String,
    ballast: Array as PropType<Array<number>>
  },
  setup (props, { emit }) {
    const showBallast = computed(() => {
      return props.ballast && props.ballast.length > 0
    })

    const showButton = computed(() => {
      return props.buttonText && props.buttonText.length > 0
    })

    const ballstConfig = ref(props.ballast as number[])

    const greenPercentage = computed((): number => {
      return ballstConfig.value[0] || 0
    })

    const orangePercentage = computed((): number => {
      return ballstConfig.value[1] || 0
    })

    const redPercentage = computed((): number => {
      return ballstConfig.value[2] || 0
    })

    const handleClick = () : void => {
      emit('click:box', props.buttonText)
    }

    return {
      showBallast,
      showButton,
      handleClick,
      greenPercentage,
      orangePercentage,
      redPercentage
    }
  }
})
</script>

<style lang="scss">
.summary-box {
  min-width: 280px;
  min-height: 200px;
  &-ballast {
    width: 120px;
  }
}
</style>
