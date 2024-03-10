<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
const alertDiv: Ref<HTMLDivElement | null> = ref(null)
const computedAlertDiv = computed(() => alertDiv.value)
const props = withDefaults(
  defineProps<{
    delay: number,
    color: string,
    show: boolean,
  }>(), 
  {
    delay: 3000,
    color: 'red',
    show: false,
  },
)

watch(() => props.show, () => {
  if(!computedAlertDiv.value)
    return;
  if(props.show) {
    computedAlertDiv.value?.classList.add('trigger');
    setTimeout(() => computedAlertDiv.value?.classList.remove('trigger'), props.delay)
  }
})

</script>

<template>
  <Teleport to="body">
    <div class="alert" :class="color" ref="alertDiv">
      <span class="material-symbols-outlined" v-if="color == 'red'">
        error
      </span>
      <span class="material-symbols-outlined" v-else>
        check_circle
      </span>
      <p>This is an alert message.</p>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.alert {
  position: fixed;
  top: 7.5%;
  left: 50%;
  padding: .5rem 1rem;
  color: var(--gray-200);
  //border-radius: .5rem;
  box-shadow: 0 0 .225rem .0625rem var(--gray-700);
  transition: all .25s ease-in-out;
  opacity: 0;
  transform: translate(-50%, -1rem);
  z-index: 9999;
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  p {
    font-size: 1rem;
    font-weight: 100;
  }
}

.red {
  background: var(--red-500);
  //border: .1765rem solid var(--red-600);
}

.green {
  background: var(--green-300);
  //border: .1765rem solid var(--green-400);
}

.trigger {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
