<template>
  <div v-show="!isReaded">
    <div class="rounded-2xl px-5 py-4 shadow-lg w-full mb-4" :class="toastClasses">
      <div class="flex items-center">
          <slot name="icon">
            <MinusIcon class="fill-current" style="stroke: #fff"/>
          </slot>
          <div class="text-start ps-2">
            <slot name="content">
              <p v-if="title" class="font-bold">{{ title }}</p>
            </slot>
          </div>
          <CrossIcon class="ms-auto cursor-pointer" @click="hide"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MinusIcon from '@/shared/components/base-icon/icons/MinusIcon.vue'
import CrossIcon from '@/shared/components/base-icon/icons/CrossIcon.vue'

enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}

const toastColors: { [key in ToastTypes]: string} = {
  info: 'text-primary bg-toastInfoBackground',
  success: 'text-toastSuccessText bg-toastSuccessBackground',
  warning: 'text-warningColor'
}

export default defineComponent({
  name: 'Toast',
  components: {
    MinusIcon,
    CrossIcon
  },
  props: {
    type: String,
    title: String
  },
  emits: ['hide'],
  setup (props, { emit }) {
    const isReaded = ref<boolean>(false)

    const toastClasses = computed(() : string => {
      const t = (props.type) ? props.type.toLowerCase().trim() : 'info'
      const toastType = t as ToastTypes
      return toastColors[toastType] || toastColors.info
    })

    const hide = () => {
      isReaded.value = true
      emit('hide', true)
    }

    return {
      isReaded,
      hide,
      toastClasses
    }
  }
})
</script>
