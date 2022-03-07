<template>
  <div>
    <button
      class="flex w-24 h-11"
      @click="onBack"
    >
      <div class="back relative chevron transform rotate-90 w-6 text-primary"></div>
      <div class="self-center text-end w-16">Back</div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BackButton',
  setup () {
    const router = useRouter()

    const onBack = (): void => {
      router.back()
    }

    return {
      onBack
    }
  }
})
</script>

<style lang="scss" scoped>
.back {
  &::after {
    @apply bg-primary;
    @apply start-5;
    @apply absolute;
  }
}
[dir="rtl"] {
  .back {
    &::after {
      bottom: 0px;
      right: -22px;
      @apply absolute;
    }
  }
}
</style>
