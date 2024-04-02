import { defineStore } from "pinia"
import { ref, computed, type Ref } from "vue"

export const useCounterStore = defineStore('info', () => {
  // const user: Ref<{} | null> = ref();
  const refreshToken: Ref<string> = ref('');
  const accessToken: Ref<string> = ref('');
  function increment() {
  }

  return { increment }
})