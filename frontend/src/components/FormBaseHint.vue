<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  to: string
}>()
</script>

<template>
  <div class="hint-field">
    <small>
      <slot name="hint"></slot>
    </small>
    <RouterLink :to="to">
      <slot name="link"></slot>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.hint-field {
  width: 100%;
  text-align: center;

  a {
    color: var(--blue-500);
    text-decoration: underline;
  }
}
</style>
