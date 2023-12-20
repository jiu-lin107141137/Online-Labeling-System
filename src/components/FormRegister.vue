<script setup lang="ts">
import FormBaseHead from './FormBaseHead.vue'
import FormBaseInputText from './FormBaseInputText.vue'
import FormBaseGraphValidation from './FormBaseGraphValidation.vue'
import FormBaseButton from './FormBaseButton.vue'
import FormBaseHint from './FormBaseHint.vue'
import BaseAlert from './BaseAlert.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { Ref } from 'vue'

const router = useRoute()
const accountValue: Ref<string> = ref('')
const passwordValue: Ref<string> = ref('')
const repasswordValue: Ref<string> = ref('')
const verificationValue: Ref<string> = ref('')
const verificationCode: Ref<string> = ref('')
const formTitle: string = router.name?.toString() ?? 'Register'
const alertColor: Ref<string> = ref('red')
const alertShow: Ref<boolean> = ref(false)
const alertDelay: Ref<number> = ref(3000)

const sendRequest = async () => {
  alertShow.value = true;
  setTimeout(() => alertShow.value = false, alertDelay.value);
}
</script>

<template>
  <div class="form-container">
    <FormBaseHead :title="formTitle" />
    <div class="form-body">
      <FormBaseInputText v-model:input-value="accountValue" :input-type="'text'">
        <template #label> Email </template>
        <template #small></template>
      </FormBaseInputText>

      <FormBaseInputText v-model:input-value="passwordValue" :input-type="'password'">
        <template #label> Password </template>
        <template #small>
          The password must consist of only numbers and alphabets
          and be 6 - 20 characters long.
        </template>
      </FormBaseInputText>

      <FormBaseInputText class="mt" v-model:input-value="repasswordValue" :input-type="'password'">
        <template #label> Password Confirm </template>
        <template #small></template>
      </FormBaseInputText>

      <FormBaseInputText v-model:input-value="verificationValue" :input-type="'text'">
        <template #label> Verification code </template>
        <template #small></template>
      </FormBaseInputText>
      <FormBaseGraphValidation @verification-code-change="(newV) => (verificationCode = newV)" />
      <FormBaseButton @click="sendRequest()" />
      <FormBaseHint :to="'/login'">
        <template #hint> Already have an account? </template>
        <template #link> Login. </template>
      </FormBaseHint>
    </div>
    <BaseAlert :color="alertColor" :show="alertShow" :delay="alertDelay"/>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  width: max(30rem, 50%);
  border-radius: 0.5rem;
  border: 0.125rem solid var(--gray-400);
  box-shadow: 0px 0px 0.25rem 0.25rem var(--gray-200);
  overflow: hidden;
  margin: 2rem 0;

  .form-body {
    padding: .5rem 1.5rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    height: 100%;

    .mt {
      margin-top: 3rem;
    }
  }
}
</style>
