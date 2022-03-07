<template>
  <div class="emptyState w-full pt-10 pb-8 px-5 bg-secondary rounded">
    <div v-if="title" class="text-xl text-center text-textColor font-bold mb-2.5">{{$t(title)}}</div>
    <div v-if="subtitle" class="emptyState-subtitle text-center mx-auto max-w-full text-sm text-textHeaderColor mb-6">{{$t(subtitle)}}</div>
    <div class="flex items-center justify-center">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyState',
  props: {
    title: String,
    subtitle: String
  }
})
</script>

<style scoped lang="scss">
  .emptyState {
    &-subtitle {
      width: 274px;
    }
  }
</style>
