<template>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        ref="modal-backdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-70"
        @click="closeModal"
      >
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 translate-y-10 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
              class="relative bg-white rounded text-start overflow-hidden shadow-xl w-1/2"
              role="dialog"
              ref="modal"
              aria-modal="true"
              aria-labelledby="modal-headline"
              @click="closeModal($event, false)"
            >
              <div class="modal-header pb-6">
                <div class="modal-title flex items-center text-textColor text-2xl border-b border-borderColor w-full h-15">
                  <p v-if="title" class="font-bold ms-5">{{ title }} </p>
                  <button class="ms-auto z-10">
                    <CrossIcon
                      @click="closeModal"
                      class="text-textColor"
                    />
                  </button>
                </div>
              </div>
              <slot>Modal content here</slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CrossIcon from '@/shared/components/base-icon/icons/CrossIcon.vue'

export default defineComponent({
  components: { CrossIcon },
  props: {
    title: {
      type: String,
      required: false
    }
  },
  emits: ['close'],
  setup (_, { emit }) {
    const closeModal = ($event: any, out = true) => {
      if (out && !$event.inner) {
        emit('close', false)
      } else $event.inner = true
    }
    return {
      closeModal
    }
  }
})
</script>
