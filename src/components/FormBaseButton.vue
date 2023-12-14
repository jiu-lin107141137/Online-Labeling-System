<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();

</script>

<template>
  <button class="btn" @click="$emit('click')">
    <slot>Submit</slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  position: relative;
  margin: .3rem auto;
  padding: .5rem;
  background: var(--blue-600);
  // background: transparent;
  color: var(--gray-200);
  border: .125rem solid var(--blue-600);
  border-radius: .5rem;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background .25s ease-in-out,
              border .25s ease-in-out;
  cursor: pointer;
}

.btn:hover {
  background: var(--blue-400);
  border: .125rem solid var(--blue-500);
}

</style>
