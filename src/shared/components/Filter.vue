<template>
  <div class="filterElem h-11 flex items-center justify-center border border-borderColor rounded p-3 pe-8 chevron">
    <div class="w-5 h-5 m-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3332 2.5H1.6665L8.33317 10.3833V15.8333L11.6665 17.5V10.3833L18.3332 2.5Z" stroke="#48525F" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="text-textColor text-base m-2">
      {{ $t("filter.filter_by") }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Filter',
  props: {
    rows: Number,
    current: Number,
    all: Number
  },
  emits: ['rowsChanged', 'pageChanged'],
  computed: {
    selected: {
      get: function (): number | undefined {
        return this.rows
      },
      set: function (rows: number): void {
        this.$emit('rowsChanged', rows)
      }
    }
  },
  methods: {
    changePage: function (direction: 1 | -1) {
      this.$emit('pageChanged', direction)
    }
  }
})
</script>

<style scoped lang="scss">
  .filterElem {
    &::after {
      right: 0.75rem;
    }
  }
  [dir="rtl"] {
    .filterElem {
      &::after {
        right: auto;
        left: 0.75rem;
      }
    }
  }
</style>
