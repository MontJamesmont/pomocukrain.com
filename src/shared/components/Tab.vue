<template>
  <div class="border-borderColor border-b-2 text-textHeaderColor text-lg">
    <ul class='flex bg-transparent tab'>
      <li
        v-for="(item, index) in items"
        :key="index"
        class='pb-2 me-12 relative cursor-pointer hover:text-primary hover:border-primary'
        @click="changeActive(index)"
        :class="index === activeItem ? 'tab-active' : ''"
      >
        {{ $t(item) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    tabItems: Array as PropType<Array<string>>
  },
  setup (props, { emit }) {
    const items = ref(props.tabItems || [])
    const activeItem = ref(0)

    const changeActive = (indexOf: number): void => {
      activeItem.value = indexOf
      emit('tabChanged', items.value[indexOf])
    }

    return {
      items,
      changeActive,
      activeItem
    }
  }
})
</script>

<style lang="scss">
.tab {
  &-active {
    @apply text-primary;
    @apply font-semibold;
    @apply border-primary;
  }
  &-active::before,
  & li:hover::before {
    @apply absolute;
    @apply w-full;
    @apply bg-primary;
    @apply rounded-sm;
    content: "";
    height: 2px;
    bottom: -2px;
    left: 0;
    z-index: 2;
  }
}

[dir="rtl"] {
  .tab {
    &-active::before,
    & li:hover::before {
      left: auto;
      right: 0;
    }
  }
}
</style>
