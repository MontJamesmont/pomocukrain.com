<template>
  <input
    type="checkbox"
    @input="check"
    :checked="checked"
    :value="value"
    :id="fieldId"
    class="inline-block align-middle me-5 cursor-pointer"
  />
  <label
    :for="fieldId"
    class="inline-block align-middle items-center font-bold text-black hover:text-primary cursor-pointer select-none mb-0"
  >
    {{ labelText }}
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: ['value', 'labelText', 'fieldId', 'modelValue'],
  setup (props, { emit }) {
    const checked = computed(() => props.modelValue.find((item : any) => JSON.stringify(item) === JSON.stringify(props.value)))

    const check = () => {
      if (!checked.value) {
        emit('update:modelValue', [...props.modelValue, props.value])
      } else {
        emit('update:modelValue', props.modelValue.filter((item : any) => JSON.stringify(item) !== JSON.stringify(props.value)))
      }
    }

    return {
      checked,
      check
    }
  }
})
</script>
