<template>
  <div class="tableWrapper">
    <slot name="table-caption"></slot>
    <TablePreheader
      v-if="resizedData.length > 0 "
      class="mb-6"
      :placeholder="placeholder"
      :addButtonText="addButtonText"
      :isFilter="isFilter"
      @search="getData($event)"
      @addButtonClicked="$emit('addButtonClicked')"
    ></TablePreheader>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" @click="sortBy(column)" nowrap="true">{{ $t(column.name) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in resizedData" :key="item.id">
          <td v-for="itemColumn in columns" :class="itemColumn.class" :key="item[itemColumn.properties]">
            <TableCell :item="item" :itemColumn="itemColumn" @toggled="toggled($event, item.id, itemColumn.properties, itemColumn.trueValue, itemColumn.falseValue)"></TableCell>
          </td>
        </tr>
        <tr v-if="resizedData.length === 0">
          <td :colspan="columns.length" class="px-0">
            <EmptyState :title="emptyStateTitle" :subtitle="emptyStateSubtitle">
              <slot></slot>
            </EmptyState>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-if="!hidePagination" :rows="rows" :current="current" :all="allPages" @rowsChanged="resizeData" @pageChanged="changePage"></Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Pagination from '@/shared/components/Pagination.vue'
import TablePreheader from '@/shared/components/TablePreheader.vue'
import TableCell from '@/shared/components/TableCell.vue'
import EmptyState from '@/shared/components/EmptyState.vue'
import { calculateStateName } from '@/shared/utils/calculateStateName'

export default defineComponent({
  name: 'TableWrapper',
  props: {
    placeholder: String,
    addButtonText: String,
    isFilter: Boolean,
    hidePagination: Boolean,
    externalFilters: Object,
    stateName: String,
    stateToSetName: String,
    columns: Array,
    emptyStateTitle: String,
    emptyStateSubtitle: String
  },
  components: {
    Pagination,
    TablePreheader,
    TableCell,
    EmptyState
  },
  data: function () {
    return {
      searchText: '' as string,
      sortByColumn: '' as string,
      sortDirection: 'ASC' as 'ASC' | 'DESC',
      rows: 10 as number,
      current: 1 as number
    }
  },
  computed: {
    data: function (): Array<any> {
      return this.$store.state[this.stateName]
    },
    allPages: function (): number {
      return this.data ? Math.ceil(this.data.length / this.rows) : 0
    },
    resizedData: function (): any[] {
      return this.data && this.data.length > 0 ? this.data.slice(0, this.rows) : []
    }
  },
  emits: ['rowsChanged', 'pageChanged', 'addButtonClicked'],
  methods: {
    getData (): void {
      if (this.stateName) {
        let basicFilters: any = {
          query: this.searchText,
          current: this.current,
          sortBy: this.sortByColumn,
          order: this.sortByColumn ? this.sortDirection : ''
        }
        if (!this.hidePagination) {
          basicFilters = {
            ...basicFilters,
            limit: this.rows
          }
        }

        this.$store.dispatch(
          calculateStateName('get', this.stateName),
          {
            ...basicFilters,
            ...this.externalFilters
          }
        )
      }
    },
    setData (item: any): void {
      if (this.stateToSetName) {
        this.$store.dispatch(
          'set' + this.stateToSetName.charAt(0).toUpperCase() + this.stateToSetName.slice(1),
          item
        )
      }
    },
    resizeData ($event: number): void {
      this.rows = $event
      this.getData()
    },
    changePage ($event: -1 | 1): void {
      if ((this.current < this.allPages && $event > 0) || (this.current > 1 && $event < 0)) {
        this.current += $event
        this.getData()
      }
    },
    searchResults ($event: string): void {
      this.searchText = $event
      this.getData()
    },
    sortBy (column: string): void {
      if (this.sortByColumn === column) this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'DESC'
      else this.sortDirection = 'ASC'
      this.sortByColumn = column
      this.getData()
    },
    toggled ($event: boolean, itemId: string, itemProperty: string, trueValue: any, falseValue: any): void {
      const item = this.data.find(item => item.id === itemId)
      item[itemProperty] = $event ? trueValue : falseValue
      this.setData(item)
    }
  },
  watch: {
    stateName: function () {
      this.getData()
    },
    externalFilters: function (newFilters, oldFilters) {
      if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
        this.getData()
      }
    }
  },
  beforeMount () {
    this.getData()
  }
})
</script>
