<template>
  <div class="flex h-screen items-center">
    <div class="w-420 m-auto">
      <h1 class="font-bold text-3xl text-center mb-14 -mt-14">{{ $t('create_account.create_title') }}</h1>
      <div class="reset flex flex-col bg-white p-9 rounded-lg shadow space-y-3 border">
        <Alert v-if="isError" type="danger" title="error"><p>{{ errorMessage }}</p></Alert>
        <FieldWrapper label="create_account.organization_name" hint="create_account.organization_name_hint" name="organization" :errors="v$.organization.$errors">
          <input name="organization" type="text" v-bind:class="{error: v$.organization.$error}" v-model="organization" class="focus:shadow" :placeholder="$t('create_account.organization_name_ph')" @blur="v$.organization.$touch"/>
        </FieldWrapper>
        <FieldWrapper label="create_account.password" name="pass" :errors="v$.pass.$errors">
          <input name="pass" type="password" v-bind:class="{error: v$.pass.$error}" v-model="pass" class="focus:shadow" placeholder="Password" @blur="v$.pass.$touch"/>
        </FieldWrapper>
        <FieldWrapper label="create_account.password_confirm" name="confirm_pass" :errors="v$.confirm_pass.$errors">
          <input name="confirm_pass" type="password" v-bind:class="{error: v$.confirm_pass.$error}" v-model="confirm_pass" class="focus:shadow" placeholder="Password" @blur="v$.confirm_pass.$touch"/>
        </FieldWrapper>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
          <div class="relative">
            <input type="checkbox" name="remember" id="remember" v-model="remember" class="inline-block align-middle" />
            <label class="inline-block align-middle text-sm font-normal ms-3 mt-3" for="remember">{{ $t('create_account.remember') }}</label>
          </div>
        </div>
        <button class="primary w-auto" @click="send">{{ $t('create_account.create') }}</button>
        <div class="relative">
          <div>{{ $t('create_account.have_account') }} <a  href="javascript: void(0)" class="inline-block text-primary font-bold hover:underline">{{ $t('create_account.login') }}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs, alphaNum } from '@/customValidators'
import client from 'axios'
import { apiEndpoints } from '@/shared/endpoints/api'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'
import Alert from '@/shared/components/Alert.vue'

export default defineComponent({
  name: 'CreateAccount',
  setup: () => ({ v$: useVuelidate() }),
  data: function () {
    return {
      organization: '',
      pass: '',
      confirm_pass: '',
      isError: false,
      errorMessage: ''
    }
  },
  validations: function () {
    return {
      organization: { required, alphaNum },
      pass: { required, minLength: minLength(8) },
      confirm_pass: { required, sameAs: sameAs(this.pass, this.$i18n.t('create_account.password')) }
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
      // and set token to login
      this.$router.push('/auth/create')
    }
  }
})
</script>
