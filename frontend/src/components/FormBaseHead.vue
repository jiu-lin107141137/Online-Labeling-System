<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="form-head">
    {{ props.title }}
  </div>
</template>

<style lang="scss" scoped>
.form-head {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  background: var(--blue-600);
  color: var(--gray-200);
  text-transform: capitalize;
  letter-spacing: 1px;
  padding: 0.5rem 0;
  border-bottom: 2px solid var(--gray-400);
  user-select: none;
}
</style>
