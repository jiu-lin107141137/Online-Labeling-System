<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<style lang="scss">
$page-max-width: 1260px;
@mixin constraint {
  @media (min-width: #{$page-max-width}) {
    @content;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto min-content;
  height: 100%;
}

.content-container {
  max-width: var(--page-max-width);
  padding-left: var(--page-gutter);
  padding-right: var(--page-gutter);
  width: 100%;

  @include constraint() {
    padding-left: 0;
    padding-right: 0;
  }
}

.container-wrapper {
  width: 100%;
  @include constraint() {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
