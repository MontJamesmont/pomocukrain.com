<template>
  <div class="pagination h-8 flex mt-5">
    <div class="pagination-rows flex ms-auto me-4">
      <div class="pagination-rows-title flex border-b border-s border-t border-borderColor rounded-s items-center justify-center">
        {{ $t("pagination.show_rows") }}
      </div>
      <select class="select-sm rounded-s-none h-full w-full" v-model="selected" name="rows">
        <option :value="2">2</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
    </div>
    <div class="pagination-current flex border rounded h-full">
      <div class="pagination-current-left chevron border-e" @click="changePage(-1)"></div>
      <div class="pagination-current-count flex items-center justify-center px-3.5">
        {{ $t("pagination.page_of", { current: current, all: all }) }}
      </div>
      <div class="pagination-current-right chevron border-s" @click="changePage(1)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
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
  .pagination {
    &-rows {
      width: 10.875rem;
      &-title {
        min-width: 6.75rem;
      }
    }
    &-current {
      &-left, &-right {
        @apply w-10 flex items-center justify-center cursor-pointer;
      }
      &-left {
        &::after {
          @apply transform rotate-90;
        }
      }
      &-right {
        &::after {
          @apply transform -rotate-90;
        }
      }
    }
  }
  [dir="rtl"] {
    .pagination {
      &-current {
        &-left {
          &::after {
            @apply transform -rotate-90;
          }
        }
        &-right {
          &::after {
            @apply transform rotate-90;
          }
        }
      }
    }
  }
</style>
