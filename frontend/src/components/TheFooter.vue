<script setup lang="ts"></script>

<template>
  <div class="container-wrapper">
    <div class="content-container">
      <footer>
        <div class="footer-left">Copyright © 2022 FlowX All rights reserved.</div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-wrapper {
  background: var(--gray-800);
}

footer {
  width: 100%;

  .footer-left {
    padding: 0.5rem 0;
    color: var(--gray-100);
    user-select: none;
  }
}
</style>
