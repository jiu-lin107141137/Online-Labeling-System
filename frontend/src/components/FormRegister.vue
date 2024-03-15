<script setup lang="ts">
import FormBaseHead from './FormBaseHead.vue'
import FormBaseInputText from './FormBaseInputText.vue'
import FormBaseGraphValidation from './FormBaseGraphValidation.vue'
import FormBaseButton from './FormBaseButton.vue'
import FormBaseHint from './FormBaseHint.vue'
import BaseAlert from './BaseAlert.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import UserAPI from '@/assets/js/UserAPI'
import type Reply from '@/assets/util/Reply'
import errorMessages from '@/assets/json/ErrorMessage.json'

const route = useRoute()
const router = useRouter()
const accountValue: Ref<string> = ref('')
const passwordValue: Ref<string> = ref('')
const repasswordValue: Ref<string> = ref('')
const verificationValue: Ref<string> = ref('')
const verificationCode: Ref<string> = ref('')
const formTitle: string = route.name?.toString() ?? 'Register'
const alertColor: Ref<string> = ref('red')
const alertShow: Ref<boolean> = ref(false)
const alertDelay: Ref<number> = ref(3000)
const alertMessage: Ref<string> = ref('alert')
const graph = ref<InstanceType<typeof FormBaseGraphValidation> | null>(null)
const computedGraph = computed(() => graph.value)

const sendRequest = async () => {
  if(!validation()) {
    updateVerification();
    return;
  }
  let res: Reply = await UserAPI.sendAPI(UserAPI.register, accountValue.value, passwordValue.value, accountValue.value);
  let code = res?.code;
  let duplicate = res?.data?.duplicate ?? false;
  if(code == 200) {
    // alertColor.value = 'green';
    // showAlert('Register successfully!');
    alert('Register successfully!');
    router.push({ name: 'login' });
  }
  else if(duplicate) {
    showAlert(errorMessages.DuplicateEmail);
  }
  else {
    showAlert(`${code}: ${res?.message}`);
  }
  updateVerification();
}

const validation = (): boolean =>  {
  // validate grahp verification code
  if(verificationCode.value != verificationValue.value) {
    showAlert(errorMessages.WrongVerification);
    return false;
  }
  // validate email
  if(!accountValue.value.match(/^\S+@\S+\.\S+$/)) {
    showAlert(errorMessages.InvalidEmailFormat);
    return false;
  }
  // validate password
  if(!passwordValue.value.match(/^[0-9A-Za-z]+$/) || passwordValue.value.length < 8 || passwordValue.value.length > 20) {
    showAlert(errorMessages.InvalidPasswordFormat);
    return false;
  }
  // validate re-password
  if(passwordValue.value != repasswordValue.value) {
    showAlert(errorMessages.PasswordMismatch);
    return false;
  }
  return true;
}

const updateVerification = () => {
  verificationValue.value = '';
  if(!computedGraph.value)
    return;
  computedGraph.value.generateCode();
}

const showAlert = (message: string|null) => {
  if(message != null)
    alertMessage.value = message;
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
          and be 8 - 20 characters long.
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
      <FormBaseGraphValidation ref="graph" @verification-code-change="(newV) => (verificationCode = newV)" />
      <FormBaseButton @click="sendRequest()" />
      <FormBaseHint :to="'/login'">
        <template #hint> Already have an account? </template>
        <template #link> Login. </template>
      </FormBaseHint>
    </div>
    <BaseAlert :color="alertColor" :show="alertShow" :delay="alertDelay" :message="alertMessage"/>
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
