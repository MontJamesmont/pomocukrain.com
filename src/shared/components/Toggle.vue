<template>
  <div class="toggle w-10 h-5 rounded-full bg-gray relative flex items-center cursor-pointer" :class="modelValue ? 'checked' : ''" @click="$emit('update:modelValue', !modelValue)"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toggle',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue']
})
</script>

<style scoped lang="scss">
  .toggle {
    &::after {
      @apply absolute w-4 h-4 bg-backgroundColor rounded-full start-0.5;
      content: '';
    }
    &.checked {
      @apply bg-primary;
      &::after {
        @apply end-0.5 start-auto;
      }
    }
  }
</style>
