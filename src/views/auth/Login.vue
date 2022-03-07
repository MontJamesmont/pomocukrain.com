<template>
  <div class="flex h-screen items-center">
    <div class="w-420 m-auto">
      <h1 class="font-bold text-3xl text-center mb-14 -mt-14">{{ $t('auth.signin_header') }}</h1>
      <div class="login flex flex-col bg-white p-9 rounded-lg shadow space-y-3 border">
        <form v-on:submit.prevent="login">
          <Alert v-if="isError" type="danger" title="error"><p>{{ $t('auth.signin_error') }}</p></Alert>
          <FieldWrapper label="auth.email" name="email" :errors="v$.email.$errors">
            <input name="email" id="email" type="text" v-bind:class="{error: v$.email.$error}" v-model="email" class="focus:shadow" placeholder="you@example.com" @blur="v$.email.$touch" :disabled="isLoading"/>
          </FieldWrapper>
          <FieldWrapper label="auth.password" name="pass" :errors="v$.password.$errors">
            <input name="password" id="password" type="password" v-bind:class="{error: v$.password.$error}" v-model="password" class="focus:shadow" placeholder="Password" @blur="v$.password.$touch" :disabled="isLoading"/>
          </FieldWrapper>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
            <div class="relative">
              <input type="checkbox" name="remember" id="remember" v-model="remember" class="inline-block align-middle" :disabled="isLoading" />
              <label class="inline-block align-middle text-sm font-normal ms-3 mt-3" for="remember">{{ $t('auth.remember') }}</label>
            </div>
            <router-link to="/auth/forgot" class="inline-block text-primary font-bold hover:underline">{{ $t('auth.forget_pass') }}</router-link>
          </div>
          <button type="submit" class="primary w-auto" :disabled="isLoading">
            <IndicatorIcon v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" ></IndicatorIcon>
            {{ $t('auth.signin') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@/customValidators'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'
import IndicatorIcon from '@/shared/components/base-icon/icons/IndicatorIcon.vue'
import Alert from '@/shared/components/Alert.vue'

export default defineComponent({
  setup: () => ({ v$: useVuelidate() }),
  data: function () {
    return {
      email: '',
      password: '',
      remember: false,
      isError: false,
      isLoading: false
    }
  },
  validations: function () {
    return {
      email: { required }, // { required, email },
      password: { required } // { required, minLength: minLength(8) }
    }
  },
  components: {
    FieldWrapper,
    Alert,
    IndicatorIcon
  },
  methods: {
    login: async function () {
      // check form validation
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      this.isLoading = true
      await this.$store.dispatch('login', { email: this.email, password: this.password, remember: this.remember }).then(() => {
        this.isLoading = false
        this.isError = false
        this.v$.$reset()
        this.email = ''
        this.password = ''
        this.$router.push(this.$route.query.redirect || '/')
      }).catch((err) => {
        this.isLoading = false
        this.isError = true
        console.log(err)
      })
    }
  }
})
</script>
