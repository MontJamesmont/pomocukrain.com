<template>
  <div class="tablePreheader flex max-w-full">
    <div v-if="placeholder" class="tablePreheader-search w-420 flex items-center max-w-full relative me-auto">
      <SearchIcon class="text-gray absolute start-2.5"></SearchIcon>
      <input type="text" v-model="searchText" @change="search" :class="searchText && searchText.length > 0 ? 'notEmpty' : ''" :placeholder="$t(placeholder)"/>
      <div class="absolute end-2.5 cursor-pointer text-primary text-sm font-bold" :class="searchText && searchText.length > 0 ? 'block' : 'hidden'" @click="searchText = ''">{{ $t("clear") }}</div>
    </div>
    <button @click="$emit('addButtonClicked')" v-if="addButtonText" class="primary large">
      <PlusIcon class="me-3.5"></PlusIcon>
      {{addButtonText}}
    </button>
    <Filter v-if="isFilter"></Filter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Filter from '@/shared/components/Filter.vue'
import PlusIcon from '@/shared/components/base-icon/icons/PlusIcon.vue'
import SearchIcon from '@/shared/components/base-icon/icons/SearchIcon.vue'

export default defineComponent({
  name: 'TablePreheader',
  props: {
    placeholder: String,
    addButtonText: String,
    isFilter: Boolean
  },
  components: {
    Filter,
    PlusIcon,
    SearchIcon
  },
  data: function () {
    return {
      searchText: '' as string
    }
  },
  emits: ['search', 'addButtonClicked'],
  methods: {
    search: function (value: string) {
      this.$emit('search', value)
    },
    clear: function () {
      this.searchText = ''
      this.search('')
    }
  }
})
</script>

<style scoped lang="scss">
  .tablePreheader {
    &-search {
      input {
        @apply h-full ps-10 bg-gray-lightest;
        min-height: 2.5rem;
        &.notEmpty {
          @apply pe-18;
        }
      }
    }
  }
</style>
