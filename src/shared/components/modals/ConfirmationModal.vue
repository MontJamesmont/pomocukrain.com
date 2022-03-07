<template>
  <BaseModal ref="modal" @close="handleCancel">
    <div class="flex flex-wrap max-w-6xl m-auto items-center justify-center text-center">
      <div class="w-full pb-10">
        <BaseIcon :name="iconName" classNames="text-8xl w-24 h-24" :class="classColor" />
      </div>
      <div class="w-full">
        <p v-if="title" class="text-textColor font-bold text-3xl p-2">{{ title }}</p>
        <p v-if="description" class="text-textColor text-lg p-2">{{ description }}</p>
      </div>
      <div class="flex flex-wrap items-center md:justify-center w-full p-6 sm:justify-around">
        <button v-if="cancelText" @click="handleCancel" class="secondary m-1 w-48">{{ cancelText }}</button>
        <button v-if="confirmText" @click="handleConfirm" class="primary m-1 w-48"> {{ confirmText }} </button>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BaseIcon from '@/shared/components/base-icon/BaseIcon.vue'
import BaseModal from '@/shared/components/modals/BaseModal.vue'
import { ModalType } from '@/shared/components/modals/const'

export default defineComponent({
  components: { BaseModal, BaseIcon },
  props: {
    title: String,
    description: String,
    type: String,
    cancelText: String,
    confirmText: String
  },
  emits: ['cancel', 'confirm'],
  setup (props, { emit }) {
    const iconName = ref<string>(props.type || ModalType.SUCCESS)
    const classColor = ref<string>('text-successColor')

    onMounted(() => {
      classColor.value = iconName.value === ModalType.WARNING ? 'text-errorColor' : 'text-successColor'
    })

    const handleCancel = () : void => {
      emit('cancel', false)
    }

    const handleConfirm = () : void => {
      emit('confirm', true)
    }

    return {
      iconName,
      classColor,
      handleCancel,
      handleConfirm
    }
  }
})
</script>
