<script setup lang="ts">
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
const isLogin = computed(() => router.name == 'login')
</script>

<template>
  <main>
    <FormLogin v-if="isLogin" />
    <FormRegister v-else />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  place-items: center;
}
</style>
