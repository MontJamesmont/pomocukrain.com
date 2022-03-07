<template>
  <div :class="wrapperClass ? wrapperClass : 'tableAction items-center text-textColor text-base px-5 py-2.5 flex'" class="cursor-pointer" @click="$emit('clicked')">
    <BaseIcon v-if="iconName" :name="iconName" class="me-2.5" />
    {{ $t(text) }}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseIcon from '@/shared/components/base-icon/BaseIcon.vue'

export default defineComponent({
  name: 'TableAction',
  components: {
    BaseIcon
  },
  props: {
    iconName: String,
    text: String,
    wrapperClass: String
  },
  emits: ['clicked']
})
</script>

<style scoped lang="scss">
  .tableAction {
    &:first-child {
      @apply pt-5;
    }
    &:last-child {
      @apply pb-5;
    }
  }
</style>
