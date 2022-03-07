<template>
  <BaseModal
    :title="title"
    ref="modal"
    @close="onClose"
  >
    <div class="modal-content p-5 pt-0">
      <slot name="content"></slot>
    </div>
    <div class="flex modal-footer justify-end p-5 border-borderColor border-t">
      <slot name="footer"></slot>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseModal from '@/shared/components/modals/BaseModal.vue'

export default defineComponent({
  components: { BaseModal },
  props: {
    title: String
  },
  emits: ['close'],
  setup (_, { emit }) {
    const onClose = (): void => {
      emit('close')
    }

    return {
      onClose
    }
  }
})
</script>
