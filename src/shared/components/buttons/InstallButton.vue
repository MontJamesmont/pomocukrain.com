<template>
  <div>
    <button
      class="flex w-full justify-center items-center rounded primary cursor-not-allowed"
      v-if="showInstalling"
      disabled
    >
      <div class="mx-2">
        <IndicatorIcon />
      </div>
      <div class="text-sm">{{ $t('button.installing') }}</div>
    </button>
    <button v-if="showOpen"
      class="flex w-full justify-center items-center rounded secondary"
    >
      <div class="text-sm">{{ $t('button.open') }}</div>
    </button>
    <button v-if="showNotInstalled"
      class="flex w-full justify-center items-center rounded primary"
    >
      <div class="text-sm">{{ $t('button.install') }}</div>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ProductState } from '@/shared/components/buttons/const'
import IndicatorIcon from '@/shared/components/base-icon/icons/IndicatorIcon.vue'

export default defineComponent({
  name: 'InstallButton',
  components: {
    IndicatorIcon
  },
  props: {
    productState: String
  },
  setup (props) {
    const productState = ref<string>(props.productState || ProductState.NOT_INSTALLED)

    const showInstalling = computed(() : boolean => {
      return productState.value === ProductState.INSTALLATION_IN_PROGRESS
    })

    const showOpen = computed(() : boolean => {
      return productState.value === ProductState.INSTALLED
    })

    const showNotInstalled = computed(() : boolean => {
      return productState.value === ProductState.NOT_INSTALLED
    })

    return {
      showInstalling,
      showOpen,
      showNotInstalled
    }
  }
})
</script>
