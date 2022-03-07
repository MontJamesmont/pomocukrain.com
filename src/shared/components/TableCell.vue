<template>
  <div v-if="!!item && !!itemColumn" class="tableCell">
    <Toggle v-if="!!itemColumn.trueValue" :modelValue="toggledInColumn" @update:modelValue="toggled"></Toggle>
    <a v-else-if="itemColumn.isLink" :href="item[itemColumn.properties]" target="blank" class="text-primary text-sm font-bold">
      {{item[itemColumn.properties]}}
    </a>
    <component v-else-if="itemColumn.customComponent" :is="componentInstance" :itemId="item.id"></component>
    <div v-else>{{item[itemColumn.properties]}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Component, markRaw } from 'vue'
import Toggle from '@/shared/components/Toggle.vue'
import { Column } from '@/shared/interfaces/column.model'

export default defineComponent({
  name: 'TableCell',
  components: {
    Toggle
  },
  props: {
    item: Object,
    itemColumn: Object as PropType<Column>
  },
  emits: ['toggled'],
  computed: {
    componentInstance: function (): Component {
      if (this.itemColumn && this.item && this.itemColumn.customComponent) {
        const item = this.item
        const itemColumn: Column = this.itemColumn
        if (itemColumn.properties !== null) {
          const component = Object.assign(
            {},
            itemColumn.customComponent,
            {
              data: function () {
                let dataObj: any
                if (itemColumn.customComponent && itemColumn.customComponent.data && itemColumn.customComponent.data()) dataObj = itemColumn.customComponent.data()
                else dataObj = {}
                if (Array.isArray(itemColumn.properties)) {
                  itemColumn.properties.forEach((prop) => {
                    dataObj = {
                      ...dataObj,
                      [prop]: item[prop]
                    }
                  })
                } else {
                  dataObj = {
                    ...dataObj,
                    [itemColumn.properties]: item[itemColumn.properties]
                  }
                }
                return dataObj
              }
            }
          )
          return markRaw(component)
        } else {
          const component = Object.assign(
            {},
            itemColumn.customComponent
          )
          return markRaw(component)
        }
      } else return { template: '' }
    },
    toggledInColumn: function (): boolean {
      if (this.itemColumn && !Array.isArray(this.itemColumn.properties)) {
        return !!this.item && !!this.itemColumn && !!this.itemColumn.trueValue && this.item[this.itemColumn.properties] === this.itemColumn.trueValue
      } else return false
    }
  },
  methods: {
    toggled: function ($event: boolean): void {
      this.$emit('toggled', $event)
    }
  }
})
</script>
