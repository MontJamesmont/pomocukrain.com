<template>
  <div class="relative flex min-h-screen items-center">
    <div class="flex items-stretch max-h-full mx-auto my-20 bg-secondary rounded-lg shadow">
      <div class="w-400 p-8 text-start leading-8 overflow-auto">
        <h1 class="text-base font-bold mb-2">{{ $t('register.about_title') }}</h1>
        <p class="text-justify mb-8">
          {{ $t('register.about_desc') }}
        </p>
        <h1 class="text-base font-bold mb-2">{{ $t('register.benefits_title') }}</h1>
        <p class="text-justify">
          {{ $t('register.benefits_desc') }}
        </p>
      </div>
      <div class="w-860 flex flex-col bg-white p-8 rounded-lg shadow border">
          <Alert v-if="isError" type="danger" title="error"><p>{{ errorMessage }}</p></Alert>
          <div class="head mb-6">
            <h1 class="font-bold text-2xl text-start mb-2">{{ $t('register.form_title') }}</h1>
            <p class="text-textHeaderColor text-start">
              {{ $t('register.form_subtitle') }}
            </p>
          </div>
          <div class="flex mb-6">
            <div class="flex-1 space-y-3 me-14">
              <h1 class="text-gray text-sm font-bold text-start">{{ $t('register.organization_details') }}</h1>
              <FieldWrapper label="register.organization_name" name="organization" :errors="v$.organization.$errors">
                <input name="organization" type="text" v-bind:class="{error: v$.organization.$error}" v-model="organization" class="focus:shadow" :placeholder="$t('register.organization_name_ph')" @blur="v$.organization.$touch"/>
              </FieldWrapper>
              <FieldWrapper label="register.company_website" name="website" :errors="v$.website.$errors">
                <input name="website" type="text" v-bind:class="{error: v$.website.$error}" v-model="website" class="focus:shadow" :placeholder="$t('register.company_website_ph')" @blur="v$.website.$touch"/>
              </FieldWrapper>
              <FieldWrapper label="register.employees_no" name="employees" :errors="v$.employees.$errors">
                <input name="employees" type="text" v-bind:class="{error: v$.employees.$error}" v-model="employees" class="focus:shadow" :placeholder="$t('register.employees_no_ph')" @blur="v$.employees.$touch"/>
              </FieldWrapper>
              <FieldWrapper label="register.country" name="country" :errors="v$.country.$errors">
                <select name="country" v-bind:class="{error: v$.country.$error}" v-model="country" class="focus:shadow" @blur="v$.country.$touch">
                  <option value="" disabled selected>{{ $t('register.country_ph') }}</option>
                  <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
                </select>
              </FieldWrapper>
            </div>
            <div class="flex-1 space-y-3">
              <h1 class="text-gray text-sm font-bold text-start">{{ $t('register.contact_details') }}</h1>
              <FieldWrapper label="register.contact_name" name="contactName" :errors="v$.contactName.$errors">
                <input name="contactName" type="text" v-bind:class="{error: v$.contactName.$error}" v-model="contactName" class="focus:shadow" :placeholder="$t('register.contact_name_ph')" @blur="v$.contactName.$touch"/>
              </FieldWrapper>
              <FieldWrapper label="register.contact_phone" name="contactPhone" :errors="v$.contactPhone.$errors">
                <input name="contactPhone" type="text" v-bind:class="{error: v$.contactPhone.$error}" v-model="contactPhone" class="focus:shadow" :placeholder="$t('register.contact_phone_ph')" @blur="v$.contactPhone.$touch"/>
              </FieldWrapper>
              <FieldWrapper label="register.contact_email" name="contactEmail" :errors="v$.contactEmail.$errors">
                <input name="contactEmail" type="text" v-bind:class="{error: v$.contactEmail.$error}" v-model="contactEmail" class="focus:shadow" :placeholder="$t('register.contact_email_ph')" @blur="v$.contactEmail.$touch"/>
              </FieldWrapper>
            </div>
          </div>
          <div class="flex flex-col items-center space-y-3">
            <button class="primary w-355 h-11" @click="register">{{ $t('register.submit') }}</button>
            <div>{{ $t('register.didnt_get_email') }} <a  href="javascript: void(0)" class="inline-block text-primary font-bold hover:underline">{{ $t('register.contact_us') }}</a></div>
          </div>
        </div>
    </div>
    <div class="absolute end-4 bottom-4 flex float-end">
      <a href="javascript: void(0)" class="text-primary font-bold me-14">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.6665 10H18.3332" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.99984 1.66675C12.0842 3.94871 13.2688 6.91011 13.3332 10.0001C13.2688 13.0901 12.0842 16.0515 9.99984 18.3334C7.91544 16.0515 6.73088 13.0901 6.6665 10.0001C6.73088 6.91011 7.91544 3.94871 9.99984 1.66675V1.66675Z" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="inline-block align-middle ms-1">{{ $t('register.visit_website') }}</span>
      </a>
      <a href="javascript: void(0)" class="text-primary font-bold me-14">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M14.1665 1.66675H5.83317C4.9127 1.66675 4.1665 2.41294 4.1665 3.33341V16.6667C4.1665 17.5872 4.9127 18.3334 5.83317 18.3334H14.1665C15.087 18.3334 15.8332 17.5872 15.8332 16.6667V3.33341C15.8332 2.41294 15.087 1.66675 14.1665 1.66675Z" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 15H10.0083" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="inline-block align-middle ms-1">{{ $t('register.call_us') }}</span>
      </a>
      <a href="javascript: void(0)" class="text-primary font-bold me-14">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3.33317 3.33325H16.6665C17.5832 3.33325 18.3332 4.08325 18.3332 4.99992V14.9999C18.3332 15.9166 17.5832 16.6666 16.6665 16.6666H3.33317C2.4165 16.6666 1.6665 15.9166 1.6665 14.9999V4.99992C1.6665 4.08325 2.4165 3.33325 3.33317 3.33325Z" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3332 5L9.99984 10.8333L1.6665 5" stroke-width="1.68" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="inline-block align-middle ms-1">{{ $t('register.email_us') }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { VueCookieNext } from 'vue-cookie-next'
import { defineComponent } from 'vue'
import countries from '@/country-code.json'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, minValue, email, phone, url, alpha, numeric } from '@/customValidators'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'
import Alert from '@/shared/components/Alert.vue'

export default defineComponent({
  name: 'Register',
  setup: () => ({ v$: useVuelidate() }),
  data: function () {
    return {
      organization: '',
      website: '',
      employees: '',
      country: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      countries: countries,
      isError: false,
      errorMessage: ''
    }
  },
  validations: function () {
    return {
      organization: { required },
      website: { url },
      employees: { required, numeric, minValue: minValue(1) },
      country: { required, alpha, minLength: minLength(2), maxLength: maxLength(2) },
      contactName: { required },
      contactPhone: { required, phone },
      contactEmail: { required, email }
    }
  },
  components: {
    FieldWrapper,
    Alert
  },
  methods: {
    register: async function () {
      // check form validation
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      // Do API Call
      // this.isError = true (If Error)
      // this.errorMessage = err (If Error)
      this.$router.push('/auth/verify')
    }
  }
})
</script>

<style lang="scss">
</style>
