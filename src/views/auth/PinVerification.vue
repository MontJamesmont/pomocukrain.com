<template>
  <div class="flex h-screen items-center">
    <div class="w-420 m-auto">
      <h1 class="font-bold text-3xl text-center mb-14 -mt-14">{{ $t('verify.verify_title') }}</h1>
      <div class="forgot flex flex-col bg-white p-9 rounded-lg shadow space-y-4 border">
        <Alert v-if="isError" type="danger" title="error"><p>{{ errorMessage }}</p></Alert>
        <FieldWrapper label="verify.pin" hint="verify.pin_hint" name="pin" :errors="v$.pin.$errors">
          <input name="pin" type="text" v-bind:class="{error: v$.pin.$error}" v-model="pin" class="focus:shadow" :placeholder="$t('verify.pin_ph')" @blur="v$.pin.$touch"/>
        </FieldWrapper>
        <button class="primary w-auto" @click="send">{{ $t('verify.next') }}</button>
        <div class="relative">
          <div>{{ $t('verify.didnt_get_email') }} <a  href="javascript: void(0)" class="inline-block text-primary font-bold hover:underline">{{ $t('verify.contact_us') }}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from '@/customValidators'
import client from 'axios'
import { apiEndpoints } from '@/shared/endpoints/api'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'
import Alert from '@/shared/components/Alert.vue'

export default defineComponent({
  name: 'PinVerification',
  setup: () => ({ v$: useVuelidate() }),
  data: function () {
    return {
      pin: '',
      isError: false,
      errorMessage: ''
    }
  },
  validations: function () {
    return {
      pin: { required, numeric, minLength: minLength(8), maxLength: maxLength(8) }
    }
  },
  components: {
    FieldWrapper,
    Alert
  },
  methods: {
    send: async function () {
      // check form validation
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      // Do API Call
      // this.isError = true (If Error)
      // this.errorMessage = err (If Error)
      this.$router.push('/auth/create')
    }
  }
})
</script>
