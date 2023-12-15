<script setup lang="ts">
defineProps<{
  inputValue: string
  inputType: string
}>()
defineEmits<{
  (e: 'update:inputValue', value: string): void
}>()
</script>

<template>
  <div class="from-base-field">
    <input
      :type="inputType"
      :value="inputValue"
      @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value.trim())"
      maxlength="30"
      required
      autocomplete="false"
    />
    <span></span>
    <label>
      <slot name="label"></slot>
    </label>
    <small>
      <slot name="small"></slot>
    </small>
  </div>
</template>

<style lang="scss" scoped>
.from-base-field {
  position: relative;
  margin: 1.5rem 1rem 0;
  border-bottom: 1px solid var(--gray-500);
  width: 100%;

  input {
    width: 100%;
    padding: 0 0.4rem;
    height: 3.2rem;
    font-size: 1.25rem;
    border: none;
    background: none;
    outline: none;
  }

  label {
    position: absolute;
    top: 60%;
    left: 0.4rem;
    color: var(--gray-500);
    font-size: 1.25rem;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.5s ease-in-out 0s;
  }

  span::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--blue-600);
    transition: all 0.5s ease-in-out 0s;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
    color: var(--blue-600);
  }

  input:focus ~ span::before,
  input:valid ~ span::before {
    width: 100%;
  }

  small {
    width: 100%;
    text-align: left;
    position: absolute;
    top: 110%;
    left: 0.5rem;
    color: var(--gray-500);
  }
}
</style>
