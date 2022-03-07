<template>
  <div class="title text-start mb-10">
    <h1 class="text-black font-bold text-3xl">{{ $t(pageTitleText) }}</h1>
    <p v-if="subtitleText.length" class="text-lg text-textHeaderColor mt-2"> {{ $t(subtitleText) }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageTitle',
  props: {
    title: String,
    subtitle: String
  },
  setup (props) {
    const subtitleText = ref(props.subtitle || '')

    const pageTitleText = computed(() => {
      return props.title || useRoute().name
    })

    return { pageTitleText, subtitleText }
  }
})
</script>
