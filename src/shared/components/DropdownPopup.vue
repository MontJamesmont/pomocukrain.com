<template>
  <div class="dropdownPopup absolute top-full start-0 border border-borderColor rounded bg-backgroundColor z-10 w-5">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownPopup'
})
</script>

<style lang="scss">
  .dropdownPopup {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05);
    width: 355px;
  }
</style>
