<script setup lang="ts">
import FormBaseHead from './FormBaseHead.vue'
import FormBaseInputText from './FormBaseInputText.vue'
import FormBaseGraphValidation from './FormBaseGraphValidation.vue'
import FormBaseButton from './FormBaseButton.vue'
import FormBaseHint from './FormBaseHint.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { Ref } from 'vue'

const router = useRoute()
const accountValue: Ref<string> = ref('')
const passwordValue: Ref<string> = ref('')
const verificationValue: Ref<string> = ref('')
const verificationCode: Ref<string> = ref('')
const formTitle: string = router.name?.toString() ?? 'Login'

const sendRequest = async () => {
  console.log('trigger')
}
</script>

<template>
  <div class="form-container">
    <FormBaseHead :title="formTitle" />
    <div class="form-body">
      <FormBaseInputText v-model:input-value="accountValue" :input-type="'text'">
        <template #label> Email </template>
        <template #small> Please enter your email here. </template>
      </FormBaseInputText>

      <FormBaseInputText v-model:input-value="passwordValue" :input-type="'password'">
        <template #label> Password </template>
        <template #small> Please enter your password here. </template>
      </FormBaseInputText>

      <FormBaseInputText v-model:input-value="verificationValue" :input-type="'text'">
        <template #label> Verification code </template>
        <template #small> Please enter the verification code here. </template>
      </FormBaseInputText>
      <FormBaseGraphValidation @verification-code-change="(newV) => (verificationCode = newV)" />
      <FormBaseButton @click="sendRequest()" />
      <FormBaseHint :to="'/register'">
        <template #hint> Haven't signed up? </template>
        <template #link> Sign up. </template>
      </FormBaseHint>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  width: max(30rem, 70%);
  border-radius: 0.5rem;
  border: 0.125rem solid var(--gray-400);
  box-shadow: 0px 0px 0.25rem 0.25rem var(--gray-200);
  overflow: hidden;
  margin: 2rem 0;

  .form-body {
    padding: 0.5rem 0.5rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    height: 100%;
  }
}
</style>
