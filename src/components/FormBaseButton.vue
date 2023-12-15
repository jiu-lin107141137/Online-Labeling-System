<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="btn" @click="$emit('click')">
    <slot>Submit</slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  position: relative;
  margin: 0.3rem auto;
  padding: 0.5rem;
  background: var(--blue-600);
  // background: transparent;
  color: var(--gray-200);
  border: 0.125rem solid var(--blue-600);
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  transition:
    background 0.25s ease-in-out,
    border 0.25s ease-in-out;
  cursor: pointer;
}

.btn:hover {
  background: var(--blue-400);
  border: 0.125rem solid var(--blue-500);
}
</style>
